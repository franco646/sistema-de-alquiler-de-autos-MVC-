const express = require('express');
const nunjucks = require('nunjucks');
const path = require('path');
const bodyParser = require('body-parser');
const csrf = require('csurf');

const configureDependencyInjection = require('./config/di');
const { init: initAutoModule } = require('./module/Car/module');
const { init: initAuthModule } = require('./module/Auth/module');
const { init: initClientModule } = require('./module/client/module');
const { init: initRentalModule } = require('./module/rental/module');

const app = express();

app.set('view engine', 'njk');
nunjucks.configure('views', {
  autoescape: true,
  express: app,
});

const csrfProtection = csrf();

const container = configureDependencyInjection();

app.use(container.get('Session'));
app.use(express.static(path.join(__dirname, 'public')));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(csrfProtection);

// envía en todos los responses csrfToken y isAuthenticated
app.use((req, res, next) => {
  res.locals.isAuthenticated = req.session.isLoggedIn;
  res.locals.csrfToken = req.csrfToken();
  next();
});

initAuthModule(app, container);
initAutoModule(app, container);
initClientModule(app, container);
initRentalModule(app, container);

const autoController = container.get('AutoController');
app.get('/', container.get('IsAuth'), autoController.index.bind(autoController));

module.exports = app;
