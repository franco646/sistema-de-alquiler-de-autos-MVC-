const Client = require('../entity/clientEntity');
const { v4: uuidv4 } = require('uuid');

exports.fromDataToEntity = ({
  id,
  nombres,
  apellidos,
  tipoDocumento,
  numeroDocumento,
  fechaNacimiento,
  nacionalidad,
  direccion,
  telefono,
  email,
  Rentals,
}) => new Client({
  id: id || uuidv4(),
  nombres,
  apellidos,
  tipoDocumento,
  numeroDocumento,
  fechaNacimiento,
  nacionalidad,
  direccion,
  telefono,
  email,
  Rentals,
});
