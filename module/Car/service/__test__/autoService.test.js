const AutoService = require('../autoService');
const CarIdNotDefineError = require('../error/CarIdNotDefineError');
const CarNotDefinedError = require('../error/CarNotDefinedError');
const Auto = require('../../entity/auto');
const CarCannotBeDeletedError = require('../error/CarCannotBeDeletedError');

const repositoryMock = {
  getAll: jest.fn(),
  save: jest.fn(),
  getById: jest.fn(),
  delete: jest.fn(),
};

const service = new AutoService(repositoryMock);

describe('AutoService', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('getAll should calls the repository´s getAll method 1 time', () => {
    service.getAll();
    expect(repositoryMock.getAll).toHaveBeenCalledTimes(1);
  });

  test('save should throw an error if car is not defined', () => {
    expect(service.save).rejects.toThrow(CarNotDefinedError);
  });

  test('save should calls the repository´s save method 1 time', () => {
    service.save({});
    expect(repositoryMock.save).toHaveBeenCalledTimes(1);
  });

  test('getById should throw an error if id is not defined', () => {
    expect(service.getById).rejects.toThrow(CarIdNotDefineError);
  });

  test('getById should calls the repository´s getById method 1 time', () => {
    service.getById(1);
    expect(repositoryMock.getById).toHaveBeenCalledTimes(1);
    expect(repositoryMock.getById).toHaveBeenCalledWith(1);
  });

  test('delete should throw an error if car is not defined', () => {
    expect(service.delete).rejects.toThrow(CarNotDefinedError);
  });

  test('delete should throw an error if car is rented', () => {
    const FAKE_CAR = new Auto({ Rentals: [{ estado: 'Alquilado' }] });
    expect(service.delete(FAKE_CAR)).rejects.toThrow(CarCannotBeDeletedError);
  });

  test('delete should calls the repository´s delete method 1 time', () => {
    const FAKE_CAR = new Auto({ id: 1, Rentals: [] });
    service.delete(FAKE_CAR);
    expect(repositoryMock.delete).toHaveBeenCalledTimes(1);
    expect(repositoryMock.delete).toHaveBeenCalledWith(FAKE_CAR);
  });
});
