const User = require('../entity/userEntity');

exports.fromDataToEntity = ({
  id,
  email,
  contraseña,
}) => new User({
  id: Number(id),
  email,
  contraseña,
});

exports.fromModelToEntity = (model) => new User(model.toJSON());
