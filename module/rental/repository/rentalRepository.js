const { fromModelToEntity } = require('../mapper/rentalMapper');
const RentalIdNotDefinedError = require('../service/error/RentalIdNotDefinedError');
const RentalNotFoundError = require('./error/RentalNotFoundError');

module.exports = class RentalRepository {
  constructor(rentalModel, clientModel, autoModel, userModel) {
    this.rentalModel = rentalModel;
    this.clientModel = clientModel;
    this.autoModel = autoModel;
    this.userModel = userModel;
  }

  async save(rental) {
    const rentalModel = await this.rentalModel.build(rental, {
      isNewRecord: !rental.id,
    });
    await rentalModel.save();
  }

  async getAll() {
    const rentals = await this.rentalModel.findAll({
      include: [
        this.clientModel,
        this.autoModel,
        this.userModel,
      ],
    });
    return rentals;
  }

  async getById(id) {
    const rentalModel = await this.rentalModel.findByPk(id, {
      include: [
        this.clientModel,
        this.autoModel,
        this.userModel,
      ],
    });

    if (!rentalModel) {
      throw new RentalNotFoundError(`No se encontro ningun alquiler con el id: ${id}`);
    }

    return fromModelToEntity(rentalModel);
  }

  async delete(rental) {
    if (!rental.id) {
      throw new RentalIdNotDefinedError();
    }
    return this.rentalModel.destroy({ where: { id: rental.id } });
  }
};
