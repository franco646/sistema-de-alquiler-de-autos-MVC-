module.exports = class Auto {
  constructor({
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
  }) {
    this.id = id;
    this.marca = marca;
    this.modelo = modelo;
    this.año = año;
    this.kms = kms;
    this.color = color;
    this.imagen = imagen;
    this.aireAcondicionado = aireAcondicionado;
    this.pasajeros = pasajeros;
    this.manualAutomatico = manualAutomatico;
    this.precioAlquilerPorDia = precioAlquilerPorDia;
    this.Rentals = Rentals;
  }
};
