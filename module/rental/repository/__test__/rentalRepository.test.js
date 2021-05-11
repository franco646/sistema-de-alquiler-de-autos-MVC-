const { Sequelize } = require('sequelize');
const RentalRepository = require('../rentalRepository');
const RentalModel = require('../../model/rentalModel');
const ClientModel = require('../../../client/model/clientModel');
const AutoModel = require('../../../Car/model/autoModel');
const UserModel = require('../../../Auth/model/userModel');
const RentalNotFoundError = require('../error/RentalNotFoundError');
const RentalIdNotDefinedError = require('../../service/error/RentalIdNotDefinedError');

const sequelizeInstance = new Sequelize('sqlite::memory:');

let repository;

describe('RentalRepository', () => {
  beforeAll(() => {
    const rental = RentalModel.setup(sequelizeInstance);
    const client = ClientModel.setup(sequelizeInstance);
    const auto = AutoModel.setup(sequelizeInstance);
    const user = UserModel.setup(sequelizeInstance);

    auto.hasMany(rental);
    rental.belongsTo(auto, { onDelete: 'cascade' });
    client.hasMany(rental);
    rental.belongsTo(client, { onDelete: 'cascade' });
    user.hasMany(rental);
    rental.belongsTo(user, { onDelete: 'cascade' });

    repository = new RentalRepository(rental, client, auto, user);
  });

  beforeEach(async (done) => {
    await sequelizeInstance.sync({ force: true });
    done();
  });

  test('getById should throw an error if no rental is found', async () => {
    await expect(repository.getById(1)).rejects.toThrow(RentalNotFoundError);
  });

  test('delete should throw an error if rental.id is not defined', async () => {
    await expect(repository.delete({})).rejects.toThrow(RentalIdNotDefinedError);
  });
});
