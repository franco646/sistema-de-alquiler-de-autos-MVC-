const UserModel = require('./model/userModel');
const AuthController = require('./controller/authController');
const AuthService = require('./service/authService');
const AuthRepository = require('./repository/authRepository');

function init(app, container) {
  const controller = container.get('AuthController');
  controller.configureRoutes(app);
}

module.exports = {
  init,
  UserModel,
  AuthController,
  AuthService,
  AuthRepository,
};
