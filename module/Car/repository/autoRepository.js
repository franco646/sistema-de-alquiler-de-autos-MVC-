const { fromDataToEntity } = require('../mapper/autoMapper');
const CarIdNotDefineError = require('../service/error/CarIdNotDefineError');
const CarNotFoundError = require('./error/CarNotFoundError');

module.exports = class AutoRepository {
  constructor(AutoModel, rentalModel) {
    this.autoModel = AutoModel;
    this.rentalModel = rentalModel;
  }

  async getAll() {
    const cars = await this.autoModel.findAll({ include: this.rentalModel });
    return cars;
  }

  async save(car) {
    const carExists = await this.autoModel.findByPk(car.id);

    const modelCar = await this.autoModel.build(car, { isNewRecord: !carExists });
    await modelCar.save();

    return fromDataToEntity(modelCar);
  }

  async getById(id) {
    const car = await this.autoModel.findByPk(id, {
      include: this.rentalModel,
    });

    if (!car) {
      throw new CarNotFoundError(`No se encontro ningun auto con el id ${id}.`);
    }

    return car;
  }

  async delete(car) {
    if (!car.id) {
      throw new CarIdNotDefineError();
    }
    return this.autoModel.destroy({ where: { id: car.id } });
  }
};
