const ClientIdNotDefinedError = require('./error/ClientIdNotDefinedError');
const ClientNotDefinedError = require('./error/ClientNotDefinedError');
const ClientCannotBeDeletedError = require('./error/ClientCannotBeDeletedError');

module.exports = class ClientService {
  constructor(clientRepository) {
    this.clientRepository = clientRepository;
  }

  async getById(id) {
    if (!id) {
      throw new ClientIdNotDefinedError();
    }
    return this.clientRepository.getById(id);
  }

  async getAll() {
    return this.clientRepository.getAll();
  }

  async save(client) {
    if (!client) {
      throw new ClientNotDefinedError();
    }
    return this.clientRepository.save(client);
  }

  async delete(client) {
    if (!client) {
      throw new ClientNotDefinedError();
    }
    client.Rentals.forEach((rental) => {
      if (rental.estado === 'Alquilado') {
        throw new ClientCannotBeDeletedError('Este cliente no puede ser eliminado porque contiene alquileres activos.');
      }
    });
    return this.clientRepository.delete(client);
  }
};
