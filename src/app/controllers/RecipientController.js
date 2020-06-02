import * as Yup from 'yup';
import Recipient from '../models/Recipient';

class RecipientController {
  async store(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string().required,
      street: Yup.string().required,
      number: Yup.string().required,
      complement: Yup.string(),
      state: Yup.string().required,
      city: Yup.string().required,
      zip_code: Yup.string().required,
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation Fails' });
    }

    const recipientExists = await Recipient.findOne({
      where: { name: req.body.name },
    });

    if (recipientExists) {
      return res.json({ error: 'This recipient is already registered' });
    }

    const {
      name,
      street,
      number,
      complement,
      state,
      city,
      zip_code,
    } = Recipient.create(req.body);

    return res.json({
      message: 'ok',
      name,
      street,
      number,
      complement,
      state,
      city,
      zip_code,
    });
  }

  async update(req, res) {
    const schema = Yup.object().shape({
      id: Yup.number().positive().required(),
      name: Yup.string(),
      street: Yup.string(),
      number: Yup.string(),
      complement: Yup.string(),
      state: Yup.string(),
      city: Yup.string(),
      zip_code: Yup.string(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation Fails' });
    }
    const { id } = req.body;
    const recipient = await Recipient.findByPk(id);

    const { name, street } = await recipient.update(req.body);

    return res.json({ message: 'Recipient updated', recipient });
  }
}

export default new RecipientController();
