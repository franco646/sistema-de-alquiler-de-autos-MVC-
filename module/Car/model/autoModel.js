const { DataTypes, Model } = require('sequelize');
const { v4: uuidv4 } = require('uuid');

module.exports = class AutoModel extends Model {
  static setup(sequelizeInstance) {
    AutoModel.init({
      id: {
        type: DataTypes.UUID,
        defaultValue: uuidv4,
        allowNull: false,
        primaryKey: true,
      },
      marca: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      modelo: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      año: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      kms: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      color: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      imagen: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      aireAcondicionado: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      pasajeros: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      manualAutomatico: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      precioAlquilerPorDia: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    }, {
      sequelize: sequelizeInstance,
      modelName: 'Auto',
    });
    return AutoModel;
  }
};
