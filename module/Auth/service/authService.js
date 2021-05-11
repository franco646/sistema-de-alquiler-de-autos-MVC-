const bcrypt = require('bcryptjs');
const AuthenticationError = require('./error/authenticationError');
const UserNotFoundError = require('../repository/error/userNotFoundError');
const EmailAlreadyExistsError = require('./error/emailAlreadyExistsError');
const UserNotDefinedError = require('./error/UserNotDefinedError');

module.exports = class AuthService {
  constructor(authRepository) {
    this.authRepository = authRepository;
  }

  async login(user) {
    if (!user) {
      throw new UserNotDefinedError();
    }
    const savedUser = await this.authRepository.findUserByEmail(user.email);
    const results = await bcrypt.compare(user.contraseña, savedUser.contraseña);
    // results are true if the passwords match.
    if (!results) {
      throw new AuthenticationError();
    }
    return savedUser;
  }

  async signin(user) {
    if (!user) {
      throw new UserNotDefinedError();
    }
    try {
      await this.authRepository.findUserByEmail(user.email);
    } catch (error) {
      if (error instanceof UserNotFoundError) {
        const hash = await bcrypt.hash(user.contraseña, 12);
        user.contraseña = hash;
        return this.authRepository.save(user);
      }
      throw error;
    }
    throw new EmailAlreadyExistsError('Este email ya se encuentra en uso, por favor intenta con otro.');
  }
};
