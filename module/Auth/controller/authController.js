/* eslint-disable class-methods-use-this */
const { fromDataToEntity } = require('../mapper/userMapper');
const userValidationSchema = require('../util/validation/userValidationSchema');
const AuthenticationError = require('../service/error/authenticationError');
const UserNotFoundError = require('../repository/error/userNotFoundError');
const UserValidationError = require('../util/validation/error/userValidationError');

module.exports = class AuthController {
  constructor(authService) {
    this.ROUTE_BASE = '/auth';
    this.authService = authService;
  }

  configureRoutes(app) {
    const ROUTE = this.ROUTE_BASE;
    app.get(`${ROUTE}/login`, this.index.bind(this));
    app.post(`${ROUTE}/login`, this.login.bind(this));
    app.post(`${ROUTE}/logout`, this.logout.bind(this));
    app.get(`${ROUTE}/signin`, this.signin.bind(this));
    app.post(`${ROUTE}/signin`, this.create.bind(this));
  }

  index(req, res) {
    res.render('auth/login', {
      path: `${this.ROUTE_BASE}/login`,
    });
  }

  signin(req, res) {
    res.render('auth/signin', {
      path: `${this.ROUTE_BASE}/signin`,
    });
  }

  async create(req, res) {
    const user = fromDataToEntity(req.body);
    const { confirmarContraseña } = req.body;
    try {
      const { error } = userValidationSchema.validate({ ...user, confirmarContraseña });
      if (error) {
        throw new UserValidationError(error.message);
      }
      await this.authService.signin(user);
      res.redirect('/auth/login');
    } catch (error) {
      res.render('auth/signin', {
        path: `${this.ROUTE_BASE}/signin`,
        user: { ...user, confirmarContraseña },
        error: error.message,
      });
    }
  }

  async login(req, res) {
    const user = fromDataToEntity(req.body);
    try {
      const { error } = userValidationSchema.validate(user);
      if (error) {
        throw new UserValidationError(error.message);
      }
      const savedUser = await this.authService.login(user);
      req.session.isLoggedIn = true;
      req.session.user = savedUser;
      return res.redirect('/cars');
    } catch (error) {
      if (error instanceof AuthenticationError || error instanceof UserNotFoundError) {
        return res.render('auth/login', {
          path: `${this.ROUTE_BASE}/login`,
          user,
          error: 'Email o contraseña incorrectos.',
        });
      }
      return res.render('auth/login', {
        path: `${this.ROUTE_BASE}/login`,
        user,
        error: error.message,
      });
    }
  }

  async logout(req, res) {
    req.session.destroy(() => {
      res.redirect('/auth/login');
    });
  }
};
