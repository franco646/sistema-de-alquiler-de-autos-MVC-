const RentalNotDefinedError = require('./error/RentalNotDefinedError');
const RentalIdNotDefinedError = require('./error/RentalIdNotDefinedError');
const RentalCannotBeDeletedError = require('./error/RentalCannotBeDeletedError');

module.exports = class RentalService {
  constructor(rentalRepository, autoRepository) {
    this.rentalRepository = rentalRepository;
    this.autoRepository = autoRepository;
  }

  async save(rental) {
    if (!rental) {
      throw new RentalNotDefinedError();
    }

    const car = await this.autoRepository.getById(rental.AutoId);
    const pricePerDay = car.precioAlquilerPorDia;

    rental.precioAlquilerPorDia = pricePerDay;
    rental.reserve();
    return this.rentalRepository.save(rental);
  }

  async getById(id) {
    if (!id) {
      throw new RentalIdNotDefinedError();
    }
    return this.rentalRepository.getById(id);
  }

  async finish(rental) {
    if (!rental) {
      throw new RentalNotDefinedError();
    }

    rental.finish();
    return this.rentalRepository.save(rental);
  }

  async getAll() {
    return this.rentalRepository.getAll();
  }

  async delete(rental) {
    if (!rental) {
      throw new RentalNotDefinedError();
    }
    if (rental.estado === 'Alquilado') {
      throw new RentalCannotBeDeletedError('No puedes eliminar este alquiler porque no fue finalizado');
    }
    return this.rentalRepository.delete(rental);
  }
};
