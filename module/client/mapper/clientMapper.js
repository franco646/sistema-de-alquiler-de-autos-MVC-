const Client = require('../entity/clientEntity');

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
  id: Number(id),
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
