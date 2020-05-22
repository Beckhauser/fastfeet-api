import Recipient from '../models/Recipient';

class RecipientController {
  async store(req, res) {
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

    console.log(name, street);
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
}

export default new RecipientController();
