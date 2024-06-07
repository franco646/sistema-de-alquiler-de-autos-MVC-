const { fromDataToEntity } = require('../mapper/clientMapper');
const ClientIdNotDefinedError = require('../service/error/ClientIdNotDefinedError');
const ClientNotFoundError = require('./error/ClientNotFoundError');

module.exports = class ClientRepostitory {
  constructor(clientModel, rentalModel) {
    this.clientModel = clientModel;
    this.rentalModel = rentalModel;
  }

  async getAll() {
    const clients = await this.clientModel.findAll({ include: this.rentalModel });
    return clients;
  }

  async getById(id) {
    const client = await this.clientModel.findByPk(id, {
      include: this.rentalModel,
    });

    if (!client) {
      throw new ClientNotFoundError();
    }

    return client;
  }

  async save(client) {
    const clientExists = await this.clientModel.findByPk(client.id);

    const clientModel = await this.clientModel.build(client, { isNewRecord: !clientExists });
    await clientModel.save();

    return fromDataToEntity(clientModel);
  }

  async delete(client) {
    if (!client.id) {
      throw new ClientIdNotDefinedError();
    }
    return this.clientModel.destroy({ where: { id: client.id } });
  }
};
