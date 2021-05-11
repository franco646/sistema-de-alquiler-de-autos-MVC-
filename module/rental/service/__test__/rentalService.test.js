const RentalNotDefinedError = require('../error/RentalNotDefinedError');
const RentalService = require('../rentalService');
const Rental = require('../../entity/rentalEntity');
const RentalIdNotDefinedError = require('../error/RentalIdNotDefinedError');
const RentalCannotBeDeletedError = require('../error/RentalCannotBeDeletedError');

const rentalRepositoryMock = {
  save: jest.fn(),
  getAll: jest.fn(),
  getById: jest.fn(),
  delete: jest.fn(),
};

const autoRepositoryMock = {
  getById: jest.fn(() => Promise.resolve({})),
};

const service = new RentalService(rentalRepositoryMock, autoRepositoryMock);

describe('rentalService', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('save should throw an error if rental is not defined', async () => {
    await expect(service.save).rejects.toThrow(RentalNotDefinedError);
  });

  test("save should calls rental's reserve method and repository's save method", async () => {
    const rentalMock = new Rental({});
    rentalMock.reserve = jest.fn();

    await service.save(rentalMock);

    expect(rentalMock.reserve).toHaveBeenCalledTimes(1);
    expect(rentalRepositoryMock.save).toHaveBeenCalledTimes(1);
    expect(rentalRepositoryMock.save).toHaveBeenCalledWith(rentalMock);
  });

  test('getById should throw an error if the id is not defined', async () => {
    await expect(service.getById).rejects.toThrow(RentalIdNotDefinedError);
  });

  test("getById should call repository's getById method", async () => {
    await service.getById(1);
    expect(rentalRepositoryMock.getById).toHaveBeenCalledTimes(1);
  });

  test('finish should throw an error if the rental is not defined', async () => {
    await expect(service.finish).rejects.toThrow(RentalNotDefinedError);
  });

  test("rental should calls rental's finish method and repository's save method", async () => {
    const rentalMock = new Rental({});
    rentalMock.finish = jest.fn();

    await service.finish(rentalMock);

    expect(rentalMock.finish).toHaveBeenCalledTimes(1);
    expect(rentalRepositoryMock.save).toHaveBeenCalledTimes(1);
  });

  test("getAll should calls repository's getAll method", async () => {
    await service.getAll();

    expect(rentalRepositoryMock.getAll).toHaveBeenCalledTimes(1);
  });

  test('delete should throw an error if the rental is not defined', async () => {
    await expect(service.delete).rejects.toThrow(RentalNotDefinedError);
  });

  test('delete should throw if rental is rented', async () => {
    await expect(service.delete({ estado: 'Alquilado' })).rejects.toThrow(RentalCannotBeDeletedError);
  });

  test("delete should calls repository's delete method", async () => {
    await service.delete({});

    expect(rentalRepositoryMock.delete).toHaveBeenCalledTimes(1);
  });
});
