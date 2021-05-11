const fs = require('fs');
const CarNotDefinedError = require('./error/CarNotDefinedError');
const CarIdNotDefineError = require('./error/CarIdNotDefineError');
const CarCannotBeDeletedError = require('./error/CarCannotBeDeletedError');

module.exports = class AutoService {
  constructor(AutoRepository) {
    this.autoRepository = AutoRepository;
  }

  async getAll() {
    return this.autoRepository.getAll();
  }

  async save(car) {
    if (!car) {
      throw new CarNotDefinedError();
    }
    return this.autoRepository.save(car);
  }

  async getById(id) {
    if (!id) {
      throw new CarIdNotDefineError();
    }
    return this.autoRepository.getById(id);
  }

  async delete(car) {
    if (!car) {
      throw new CarNotDefinedError();
    }
    car.Rentals.forEach((rental) => {
      if (rental.estado === 'Alquilado') {
        throw new CarCannotBeDeletedError('Este auto no puede ser eliminado porque contiene alquileres activos.');
      }
    });
    if (car.imagen) {
      fs.unlink(car.imagen, () => {});
    }
    return this.autoRepository.delete(car);
  }
};
