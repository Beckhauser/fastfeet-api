import * as Yup from 'yup';
import { format, startOfDay, endOfDay } from 'date-fns';
import { Sequelize } from 'sequelize';
import Delivery from '../models/Delivery';
import File from '../models/File';

class OrderController {
  async orderToDelivery(req, res) {
    const orders = await Delivery.findAll({
      where: {
        deliveryman_id: req.params.id,
        signature_id: null,
        canceled_at: null,
      },
    });

    return res.json(orders);
  }

  async orderAlreadyDelivered(req, res) {
    const { Op } = Sequelize;
    const schema = Yup.object().shape({
      id: Yup.number().required(),
    });

    if (!(await schema.isValid(req.params))) {
      return res.status(400).json({ error: 'Validation fails, ID is missing' });
    }

    const alreadyDelivered = await Delivery.findAll({
      where: {
        end_date: {
          [Op.ne]: null,
        },
        deliveryman_id: req.params.id,
      },
    });

    return res.json(alreadyDelivered);
  }

  async withdrawOrderForDelivery(req, res) {
    const { Op } = Sequelize;
    const schema = Yup.object().shape({
      id: Yup.number().required(),
    });

    if (!(await schema.isValid(req.params))) {
      return res.status(400).json({ error: 'Validation Fails' });
    }
    const timeNow = format(new Date(), 'HH');

    if (timeNow < 8 || timeNow > 23) {
      return res.json('Time not allowed for order pickup');
    }

    const delivery = await Delivery.findByPk(req.params.id);

    if (delivery.start_date != null) {
      return res.json({
        message: `The order has been withdraw at date: ${format(
          delivery.start_date,
          "dd/MM/yyyy 'at' HH:mm"
        )}`,
      });
    }
    if (delivery.canceled_at != null) {
      return res.json({
        message: `The order has been canceled at date: ${format(
          delivery.canceled_at,
          "dd/MM/yyyy 'at' HH:mm"
        )}`,
      });
    }

    const { count } = await Delivery.findAndCountAll({
      where: {
        deliveryman_id: delivery.deliveryman_id,
        canceled_at: null,
        start_date: {
          [Op.between]: [startOfDay(new Date()), endOfDay(new Date())],
        },
        end_date: null,
      },
    });

    if (count >= 5) {
      return res.json({
        message: 'You exceeded the maximum number of withdrawals per day',
      });
    }
    await delivery.update({ start_date: new Date() });
    return res
      .status(200)
      .json({ message: 'Order successfully withdrawn', delivery });
  }

  async finishOrder(req, res) {
    const schema = Yup.object().shape({
      id: Yup.number().required(),
    });

    if (!(await schema.isValid(req.params))) {
      return res.status(400).json({ error: 'Validation fails, ID is missing' });
    }

    const finishDelivery = await Delivery.findByPk(req.params.id);

    if (!finishDelivery) {
      return res.json({ message: 'Order does not exist' });
    }

    if (finishDelivery.end_date !== null) {
      return res.json({ message: 'Order Already finalized' });
    }

    if (req.file) {
      const { originalname: name, filename: path } = req.file;

      const { id } = await File.create({
        name,
        path,
      });

      await finishDelivery.update({
        end_date: new Date(),
        signature_id: id,
      });
    } else {
      await finishDelivery.update({
        end_date: new Date(),
      });
    }

    return res.json(finishDelivery);
  }
}

export default new OrderController();
