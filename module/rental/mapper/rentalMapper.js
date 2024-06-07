const Rental = require('../entity/rentalEntity');
const AutoEntity = require('../../Car/entity/auto');
const ClientEntity = require('../../client/entity/clientEntity');
const UserEntity = require('../../Auth/entity/userEntity');
const { v4: uuidv4 } = require('uuid');

exports.fromDataToEntity = ({
  id,
  alquilerDesde,
  alquilerHasta,
  medioDePago,
  total,
  estado,
  ClientId,
  AutoId,
  user,
}) => new Rental({
  id: id || uuidv4(),
  alquilerDesde,
  alquilerHasta,
  medioDePago,
  total,
  estado,
  ClientId,
  AutoId,
  UserId: user.id,
});

exports.fromModelToEntity = ({
  id,
  alquilerDesde,
  alquilerHasta,
  medioDePago,
  total,
  estado,
  ClientId,
  AutoId,
  UserId,
  Auto,
  Client,
  User,
}) => new Rental({
  id,
  alquilerDesde,
  alquilerHasta,
  medioDePago,
  total,
  estado,
  ClientId,
  AutoId,
  UserId,
  Auto: Auto ? new AutoEntity(Auto) : null,
  Client: Client ? new ClientEntity(Client) : null,
  User: new UserEntity(User),
});
