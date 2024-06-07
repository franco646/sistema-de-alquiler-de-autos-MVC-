const UserNotFoundError = require('./error/userNotFoundError');
const UserEmailNotDefinedError = require('./error/UserEmailNotDefinedError');
const UserNotDefinedError = require('./error/UserNotDefinedError');
const { fromModelToEntity } = require('../mapper/userMapper');

module.exports = class authRepository {
  constructor(userModel) {
    this.userModel = userModel;
  }

  async findUserByEmail(email) {
    if (!email) {
      throw new UserEmailNotDefinedError();
    }

    const user = await this.userModel.findOne({ where: { email } });

    if (!user) {
      throw new UserNotFoundError(`No se encontró ningún usuario con el email: ${email}`);
    }

    return fromModelToEntity(user);
  }

  async save(user) {
    if (!user) {
      throw new UserNotDefinedError();
    }

    const userExists = await this.userModel.findByPk(user.id);

    const userModel = await this.userModel.build(user, { isNewRecord: !userExists });
    await userModel.save();
  }
};
