module.exports = class Client {
  constructor({
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
  }) {
    this.id = id;
    this.nombres = nombres;
    this.apellidos = apellidos;
    this.tipoDocumento = tipoDocumento;
    this.numeroDocumento = numeroDocumento;
    this.fechaNacimiento = fechaNacimiento;
    this.nacionalidad = nacionalidad;
    this.direccion = direccion;
    this.telefono = telefono;
    this.email = email;
    this.Rentals = Rentals;
  }
};
