const { Sequelize } = require('sequelize');
const AutoRepository = require('../autoRepository');
const AutoModel = require('../../model/autoModel');
const RentalModel = require('../../../rental/model/rentalModel');
const Auto = require('../../entity/auto');
const CarNotFoundError = require('../error/CarNotFoundError');
const CarIdNotDefineError = require('../../service/error/CarIdNotDefineError');

const sequelizeInstance = new Sequelize('sqlite::memory:');

let repository;

const autoMock = new Auto({
  marca: 'Ford',
  modelo: 'Fiesta',
  año: '2021',
  kms: '0',
  color: 'Rojo',
  imagen: 'auto/imgen.png',
  aireAcondicionado: 'si',
  pasajeros: '5',
  manualAutomatico: 'manual',
  precioAlquilerPorDia: '1200',
  Rentals: [],
});

describe('AutoRepository', () => {
  beforeAll(() => {
    const auto = AutoModel.setup(sequelizeInstance);
    const rental = RentalModel.setup(sequelizeInstance);
    auto.hasMany(rental);
    rental.belongsTo(auto, { onDelete: 'cascade' });

    repository = new AutoRepository(auto, rental);
  });

  beforeEach(async (done) => {
    await sequelizeInstance.sync({ force: true });
    done();
  });

  test('save should create a new car', async () => {
    const newCar = await repository.save(autoMock);
    expect(newCar.id).toEqual(1);
  });

  test('save should update a car when the id is defined', async () => {
    const newCar = await repository.save(autoMock);
    expect(newCar.id).toEqual(1);

    newCar.marca = 'Chevrolet';
    newCar.modelo = 'Corsa';
    const updatedCar = await repository.save(newCar);
    expect(updatedCar.id).toEqual(1);
    expect(updatedCar.marca).toEqual('Chevrolet');
    expect(updatedCar.modelo).toEqual('Corsa');
  });

  test('getById should throw an error if no car is found', async () => {
    await expect(repository.getById(1)).rejects.toThrow(CarNotFoundError);
  });

  test('delete should throw an error if the id is not defined', async () => {
    await expect(repository.delete({ id: undefined })).rejects.toThrow(CarIdNotDefineError);
  });
});
