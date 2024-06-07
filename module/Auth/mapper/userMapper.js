const User = require('../entity/userEntity');
const { v4: uuidv4 } = require('uuid');

exports.fromDataToEntity = ({
  id,
  email,
  contraseña,
}) => new User({
  id: id || uuidv4(),
  email,
  contraseña,
});

exports.fromModelToEntity = (model) => new User(model.toJSON());
