const { DataTypes, Model } = require('sequelize');

module.exports = class RentalModel extends Model {
  static setup(sequelizeInstance) {
    RentalModel.init({
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
      },
      alquilerDesde: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      alquilerHasta: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      medioDePago: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      total: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      estado: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    }, {
      sequelize: sequelizeInstance,
      modelName: 'Rental',
    });
    return RentalModel;
  }

  static setupAssociations(carModel, clientModel, userModel) {
    carModel.hasMany(RentalModel);
    RentalModel.belongsTo(carModel, { onDelete: 'cascade' });
    clientModel.hasMany(RentalModel);
    RentalModel.belongsTo(clientModel, { onDelete: 'cascade' });
    userModel.hasMany(RentalModel);
    RentalModel.belongsTo(userModel, { onDelete: 'cascade' });
  }
};
