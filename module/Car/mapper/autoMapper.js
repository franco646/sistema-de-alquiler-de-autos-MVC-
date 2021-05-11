const Auto = require('../entity/auto');

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
  id: Number(id),
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
