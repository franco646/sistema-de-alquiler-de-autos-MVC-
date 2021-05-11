module.exports = class Rental {
  constructor({
    id,
    alquilerDesde,
    alquilerHasta,
    medioDePago,
    total,
    estado,
    AutoId,
    ClientId,
    UserId,
    Auto,
    Client,
    User,
  }) {
    this.id = id;
    this.alquilerDesde = alquilerDesde;
    this.alquilerHasta = alquilerHasta;
    this.medioDePago = medioDePago;
    this.total = total;
    this.estado = estado;
    this.ClientId = ClientId;
    this.AutoId = AutoId;
    this.UserId = UserId;
    this.Auto = Auto;
    this.Client = Client;
    this.User = User;
  }

  calculateDiffDays() {
    const oneDay = 24 * 60 * 60 * 1000; // hours*minutes*seconds*milliseconds
    const firstDate = new Date(this.alquilerDesde);
    const secondDate = new Date(this.alquilerHasta);

    const diffDays = Math.round(Math.abs((firstDate - secondDate) / oneDay));
    return diffDays;
  }

  reserve() {
    this.estado = 'Alquilado';
    this.total = this.precioAlquilerPorDia * this.calculateDiffDays();
  }

  finish() {
    this.estado = 'Finalizado';
  }
};
