const { DataTypes, Model } = require('sequelize');

module.exports = class UserModel extends Model {
  static setup(sequelizeInstance) {
    UserModel.init({
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      contraseña: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    }, {
      sequelize: sequelizeInstance,
      modelName: 'User',
    });
    return UserModel;
  }
};
