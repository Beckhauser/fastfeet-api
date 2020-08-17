import * as Yup from 'yup';
import Delivery from '../models/Delivery';
import Mail from '../../lib/Mail';
import Deliveryman from '../models/Deliveryman';

class DeliveryController {
  async listAllDelivery(req, res) {
    const allDeliveries = await Delivery.findAll();

    return res.json(allDeliveries);
  }

  async createDelivery(req, res) {
    const schema = Yup.object().shape({
      recipient_id: Yup.number().required(),
      deliveryman_id: Yup.number().required(),
      product: Yup.string().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation Fails' });
    }

    const delivery = await Delivery.create(req.body);

    const { name, email } = await Deliveryman.findByPk(delivery.deliveryman_id);

    await Mail.sendMail({
      to: `${name} <${email}>`,
      subject: 'Nova entrega',
      template: 'delivery',
      context: {
        deliveryman: name,
      },
    });

    return res.json(delivery);
  }

  async updateDelivery(req, res) {
    const schema = Yup.object().shape({
      id: Yup.number().required(),
    });

    if (!(await schema.isValid(req.params))) {
      return res.status(400).json({ error: 'Validation Fails' });
    }

    const delivery = await Delivery.findByPk(req.params.id);

    await delivery.update(req.body);

    return res.json(delivery);
  }

  async deleteDelivery(req, res) {
    const deliveryExists = await Delivery.findByPk(req.params.id);

    if (!deliveryExists) {
      return res.json({ error: 'Delivery not found' });
    }
    if (deliveryExists.canceled_at) {
      return res.json({
        error: `This delivery already been canceled at ${deliveryExists.canceled_at}`,
      });
    }

    await deliveryExists.update({ canceled_at: new Date() });

    return res.json({ message: deliveryExists });
  }
}

export default new DeliveryController();
