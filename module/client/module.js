const ClientController = require('./controller/clientController');
const ClientService = require('./service/clientService');
const ClientRepostitory = require('./repository/clientRepository');
const ClientModel = require('./model/clientModel');

function init(app, container) {
  const controller = container.get('ClientController');
  controller.configureRoutes(app);
}

module.exports = {
  init,
  ClientController,
  ClientService,
  ClientRepostitory,
  ClientModel,
};
