const { DataTypes, Model } = require('sequelize');

module.exports = class ClientModel extends Model {
  static setup(sequelizeInstance) {
    ClientModel.init({
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
      },
      nombres: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      apellidos: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      tipoDocumento: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      numeroDocumento: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      fechaNacimiento: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      nacionalidad: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      direccion: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      telefono: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    }, {
      sequelize: sequelizeInstance,
      modelName: 'Client',
    });
    return ClientModel;
  }
};
