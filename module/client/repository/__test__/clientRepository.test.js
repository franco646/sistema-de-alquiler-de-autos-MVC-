const { Sequelize } = require('sequelize');
const ClientRepostitory = require('../clientRepository');
const Client = require('../../entity/clientEntity');
const ClientModel = require('../../model/clientModel');
const RentalModel = require('../../../rental/model/rentalModel');
const ClientIdNotDefinedError = require('../../service/error/ClientIdNotDefinedError');
const ClientNotFoundError = require('../error/ClientNotFoundError');

const sequelizeInstance = new Sequelize('sqlite::memory:');
let repository;

const clientMock = new Client({
  nombres: 'names',
  apellidos: 'surnames',
  tipoDocumento: 'D.N.I.',
  numeroDocumento: '12345678',
  fechaNacimiento: '10/10/2010',
  nacionalidad: 'Argentina',
  direccion: 'adress 123',
  telefono: '1122334455',
  email: 'test@test.com',
});

describe('clientRepository', () => {
  beforeAll(() => {
    const client = ClientModel.setup(sequelizeInstance);
    const rental = RentalModel.setup(sequelizeInstance);
    client.hasMany(rental);
    rental.belongsTo(client, { onDelete: 'cascade' });

    repository = new ClientRepostitory(client, rental);
  });

  beforeEach(async (done) => {
    await sequelizeInstance.sync({ force: true });
    done();
  });

  test('getById should throw an error if no client is found ', async () => {
    await expect(repository.getById(1)).rejects.toThrow(ClientNotFoundError);
  });

  test('delete should throw an error if the id is not defined', async () => {
    await expect(repository.delete({ id: undefined })).rejects.toThrow(ClientIdNotDefinedError);
  });

  test('save should create a new client when the id is not defined', async () => {
    const newClient = await repository.save(clientMock);
    expect(newClient.id).toEqual(1);
  });

  test('save should update the client when the id is defined', async () => {
    const newClient = await repository.save(clientMock);
    expect(newClient.id).toEqual(1);

    newClient.nombres = '';
    newClient.apellidos = '';
    const updatedClient = await repository.save(newClient);
    expect(updatedClient.id).toEqual(1);
    expect(updatedClient.nombres).toEqual('');
    expect(updatedClient.apellidos).toEqual('');
  });
});
