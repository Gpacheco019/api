const ContactRepository = require('../repositories/ContactRepository');

class ContactController {
  async index(request, response) {
    const { orderBy } = request.query;
    const contacts = await ContactRepository.findAll(orderBy);

    response.json(contacts);
  }

  async show(request, response) {
    // Obter UM contato
    const { id } = request.params;
    const contacts = await ContactRepository.findById(id);

    if (!contacts) {
      return response.status(404).json({ error: 'Contact not found' });
    }

    response.json(contacts);
  }

  async store(request, response) {
    // Criar novo contato
    const {
      name, email, phone, category_id,
    } = request.body;

    if (!name) {
      return response.status(400).json({ error: 'Name is required' });
    }

    const contactExists = await ContactRepository.findByEmail(email);

    if (contactExists) {
      return response.status(400).json({ error: 'Email already exists' });
    }

    const contact = await ContactRepository.create({
      name, email, phone, category_id,
    });

    response.status(201).json(contact);
  }

  async update(request, response) {
    // Editar um contato
    const { id } = request.params;
    const {
      name, email, phone, category_id,
    } = request.body;

    if (!name) {
      return response.status(400).json({ error: 'Name is required' });
    }

    const contactsExists = await ContactRepository.findById(id);
    if (!contactsExists) {
      return response.status(404).json({ error: 'Contact not found' });
    }

    const contactEmailExists = await ContactRepository.findByEmail(email);
    if (contactEmailExists && contactEmailExists.id !== id) {
      return response.status(400).json({ error: 'Email already exists' });
    }

    const contact = await ContactRepository.update(id, {
      name, email, phone, category_id,
    });

    response.json(contact);
  }

  async delete(request, response) {
    // Deletar um contato
    const { id } = request.params;

    await ContactRepository.delete(id);
    response.sendStatus(204);
  }
}

module.exports = new ContactController();
