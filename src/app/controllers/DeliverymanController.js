import * as Yup from 'yup';
import Deliveryman from '../models/Deliveryman';

class DeliverymanController {
  async listAllDeliveryman(req, res) {
    const deliveryman = await Deliveryman.findAll();
    return res.json(deliveryman);
  }

  async createDeliveryman(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string().required(),
      email: Yup.string().email().required(),
      avatar_id: Yup.number(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation Fails' });
    }

    const checkEmailAlreadyExists = await Deliveryman.findOne({
      where: { email: req.body.email },
    });

    if (checkEmailAlreadyExists) {
      return res.status(400).json({ error: 'This e-mail already exists' });
    }

    const { id, name } = await Deliveryman.create(req.body);

    return res.status(200).json({ id, name });
  }

  async updateDeliveryman(req, res) {
    const deliveryman = await Deliveryman.findByPk(req.params.id);

    if (!deliveryman) {
      return res.json({ message: "The specified Deliveryman doesn't exists" });
    }

    const checkIfEmailAlreadyExists = await Deliveryman.findOne({
      where: { email: req.body.email },
    });

    if (
      checkIfEmailAlreadyExists &&
      Number(checkIfEmailAlreadyExists.id) !== Number(req.params.id)
    ) {
      return res.status(400).json({ message: 'This email is already in use' });
    }

    await deliveryman.update(req.body);
    await deliveryman.save();

    return res.json(deliveryman);
  }

  async deleteDeliveryman(req, res) {
    const deliveryman = await Deliveryman.findByPk(req.params.id);

    if (deliveryman === null) {
      return res.json({ message: "Deliveryman doesn't exists" });
    }
    await deliveryman.destroy();

    return res.json({ message: `${deliveryman.name} has been deleted` });
  }
}

export default new DeliverymanController();
