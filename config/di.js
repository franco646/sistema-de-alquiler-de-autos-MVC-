const {
  default: DIContainer, object, get, factory,
} = require('rsdi');
const session = require('express-session');
const SequelizeStore = require('connect-session-sequelize')(session.Store);
const { Sequelize } = require('sequelize');
const multer = require('multer');

const {
  AutoModel,
  AutoController,
  AutoRepository,
  AutoService,
} = require('../module/Car/module');

const {
  UserModel,
  AuthController,
  AuthService,
  AuthRepository,
} = require('../module/Auth/module');

const {
  ClientController,
  ClientService,
  ClientRepostitory,
  ClientModel,
} = require('../module/client/module');

const {
  RentalController,
  RentalService,
  RentalRepository,
  RentalModel,
} = require('../module/rental/module');

function configureMainSequelizeDatabase() {
  const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: 'db/db.sqlite',
  });
  return sequelize;
}

function configureSessionSequelizeDatabase() {
  const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: 'db/db.sqlite',
  });
  return sequelize;
}

function configureMulter() {
  const storage = multer.diskStorage({
    destination(req, file, cb) {
      cb(null, 'uploads/img');
    },
    filename(req, file, cb) {
      cb(null, `${file.fieldname}-${Date.now()}`);
    },
  });

  return multer({ storage }).single('imagen');
}

function configureAuthMiddlware() {
  const isAuth = (req, res, next) => {
    if (!req.session.isLoggedIn) {
      return res.redirect('/auth/login');
    }
    return next();
  };
  return isAuth;
}

function configureSession(container) {
  const sequelize = container.get('SessionSequelize');
  const sessionOptions = {
    secret: 'my secret',
    resave: false,
    saveUninitialized: false,
    store: new SequelizeStore({ db: sequelize }),
  };
  return session(sessionOptions);
}

function addCommonsDefinitions(container) {
  container.addDefinitions({
    IsAuth: factory(configureAuthMiddlware),
    Sequelize: factory(configureMainSequelizeDatabase),
    SessionSequelize: factory(configureSessionSequelizeDatabase),
    Session: factory(configureSession),
    Multer: factory(configureMulter),
  });
}

function configureAutoModel(container) {
  return AutoModel.setup(container.get('Sequelize'));
}

function configureUserModel(container) {
  return UserModel.setup(container.get('Sequelize'));
}

function configureClientModel(container) {
  return ClientModel.setup(container.get('Sequelize'));
}

function configureRentalModel(container) {
  RentalModel.setup(container.get('Sequelize'));
  RentalModel.setupAssociations(container.get('AutoModel'), container.get('ClientModel'), container.get('UserModel'));
  return RentalModel;
}

function addAuthDefinitions(container) {
  container.addDefinitions({
    UserModel: factory(configureUserModel),
    AuthRepository: object(AuthRepository).construct(get('UserModel')),
    AuthService: object(AuthService).construct(get('AuthRepository')),
    AuthController: object(AuthController).construct(get('AuthService')),
  });
}

function addAutoDefninitions(container) {
  container.addDefinitions({
    AutoController: object(AutoController).construct(
      get('Multer'),
      get('IsAuth'),
      get('AutoService'),
    ),
    AutoService: object(AutoService).construct(get('AutoRepository')),
    AutoRepository: object(AutoRepository).construct(get('AutoModel'), get('RentalModel')),
    AutoModel: factory(configureAutoModel),
  });
}

function addClientDefinitions(container) {
  container.addDefinitions({
    ClientModel: factory(configureClientModel),
    ClientRepostitory: object(ClientRepostitory).construct(get('ClientModel'), get('RentalModel')),
    ClientService: object(ClientService).construct(get('ClientRepostitory')),
    ClientController: object(ClientController).construct(get('IsAuth'), get('ClientService')),
  });
}

function addRentalDefinitions(container) {
  container.addDefinitions({
    RentalController: object(RentalController).construct(get('IsAuth'), get('RentalService'), get('ClientService'), get('AutoService')),
    RentalService: object(RentalService).construct(get('RentalRepository'), get('AutoRepository')),
    RentalRepository: object(RentalRepository).construct(get('RentalModel'), get('ClientModel'), get('AutoModel'), get('UserModel')),
    RentalModel: factory(configureRentalModel),
  });
}

module.exports = function configureDi() {
  const container = new DIContainer();
  addCommonsDefinitions(container);
  addAuthDefinitions(container);
  addAutoDefninitions(container);
  addClientDefinitions(container);
  addRentalDefinitions(container);
  return container;
};
