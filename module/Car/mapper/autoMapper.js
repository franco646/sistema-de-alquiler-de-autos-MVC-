const Auto = require('../entity/auto');
const { v4: uuidv4 } = require('uuid');

exports.fromDataToEntity = ({
  id,
  marca,
  modelo,
  año,
  kms,
  color,
  imagen,
  aireAcondicionado,
  pasajeros,
  manualAutomatico,
  precioAlquilerPorDia,
  Rentals,
}) => new Auto({
  id: id || uuidv4(),
  marca,
  modelo,
  año,
  kms,
  color,
  imagen,
  aireAcondicionado,
  pasajeros,
  manualAutomatico,
  precioAlquilerPorDia,
  Rentals,
});
