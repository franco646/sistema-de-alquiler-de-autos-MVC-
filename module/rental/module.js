const RentalController = require('./controller/rentalController');
const RentalService = require('./service/rentalService');
const RentalRepository = require('./repository/rentalRepository');
const RentalModel = require('./model/rentalModel');

function init(app, container) {
  const controller = container.get('RentalController');
  controller.configureRoutes(app);
}

module.exports = {
  init,
  RentalController,
  RentalService,
  RentalRepository,
  RentalModel,
};
