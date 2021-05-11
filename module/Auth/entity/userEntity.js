module.exports = class User {
  constructor({
    id,
    email,
    contraseña,
  }) {
    this.id = id;
    this.email = email;
    this.contraseña = contraseña;
  }
};
