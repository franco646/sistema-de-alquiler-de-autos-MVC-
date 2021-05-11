const ClientService = require('../clientService');
const ClientCannotBeDeletedError = require('../error/ClientCannotBeDeletedError');
const ClientIdNotDefinedError = require('../error/ClientIdNotDefinedError');
const ClientNotDefinedError = require('../error/ClientNotDefinedError');

const repositoryMock = {
  getAll: jest.fn(),
  getById: jest.fn(),
  save: jest.fn(),
  delete: jest.fn(),
};

const service = new ClientService(repositoryMock);

describe('clientController', () => {
  test('getById should throw an error if the id is not defined', async () => {
    await expect(service.getById()).rejects.toThrow(ClientIdNotDefinedError);
  });

  test("getById should calls repository's getById method one time", async () => {
    await service.getById(1);
    expect(repositoryMock.getById).toHaveBeenCalledTimes(1);
    expect(repositoryMock.getById).toHaveBeenCalledWith(1);
  });

  test("getAll should calls repository's getAll method one time", async () => {
    await service.getAll();
    expect(repositoryMock.getAll).toHaveBeenCalledTimes(1);
  });

  test('save should throw an error if the client is no defined', async () => {
    expect(service.save).rejects.toThrow(ClientNotDefinedError);
  });

  test("save should calls repository's save method one time", async () => {
    await service.save({});
    expect(repositoryMock.save).toHaveBeenCalledTimes(1);
    expect(repositoryMock.save).toHaveBeenCalledWith({});
  });

  test('delete should throw an error if the client is no defined', async () => {
    await expect(service.delete).rejects.toThrow(ClientNotDefinedError);
  });

  test('delete should throw an error if the client cannot be deleted', async () => {
    await expect(() => service.delete({ Rentals: [{ estado: 'Alquilado' }] })).rejects.toThrow(ClientCannotBeDeletedError);
  });

  test("delete should calls repository's delete method one time with the client", async () => {
    await service.delete({ Rentals: [] });
    expect(repositoryMock.delete).toHaveBeenCalledTimes(1);
    expect(repositoryMock.delete).toHaveBeenCalledWith({ Rentals: [] });
  });
});
