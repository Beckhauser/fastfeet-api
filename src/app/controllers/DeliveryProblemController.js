import * as Yup from 'yup';
import { format } from 'date-fns';
import DeliveryProblem from '../models/DeliveryProblem';
import Delivery from '../models/Delivery';

class DeliveryProblemController {
  async index(req, res) {
    const problemsWithDeliveries = await DeliveryProblem.findAll({
      where: {
        delivery_id: req.params.id,
      },
    });

    res.json(problemsWithDeliveries);
  }

  async listAll(req, res) {
    const problemsWithDeliveries = await DeliveryProblem.findAll();

    return res.json(problemsWithDeliveries);
  }

  async reportAProblem(req, res) {
    const schema = Yup.object().shape({
      delivery_id: Yup.number().required(),
      description: Yup.string().required(),
    });

    const problemBody = {
      delivery_id: req.params.id,
      description: req.body.description,
    };

    if (!(await schema.isValid(problemBody))) {
      return res.status(400).json({ error: 'Validation Fails' });
    }

    const reportADeliveryProblem = await DeliveryProblem.create({
      delivery_id: problemBody.delivery_id,
      description: problemBody.description,
    });

    return res.status(200).json(reportADeliveryProblem);
  }

  async cancelDelivery(req, res) {
    const schema = Yup.object().shape({
      id: Yup.number().required(),
    });
    if (!(await schema.isValid(req.params))) {
      return res.status(400).json({ error: 'Validation Fails' });
    }

    const problem = await DeliveryProblem.findByPk(req.params.id);

    if (!problem) {
      return res.json('Problem not found');
    }

    const deliveryToCancel = await Delivery.findByPk(problem.delivery_id);

    if (deliveryToCancel.canceled_at != null) {
      return res.json({
        message: `This order already been canceled at ${format(
          deliveryToCancel.canceled_at,
          'dd/MM/yyyy HH:mm'
        )}`,
      });
    }

    deliveryToCancel.update({ canceled_at: new Date() });

    return res.json(deliveryToCancel);
  }
}

export default new DeliveryProblemController();
