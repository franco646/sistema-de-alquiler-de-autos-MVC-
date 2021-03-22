const express = require('express');
const nunjucks = require('nunjucks');
const path = require('path');
const bodyParser = require('body-parser');
const multer = require('multer');
const session = require('express-session');
const csrf = require('csurf');
const SequelizeStore = require('connect-session-sequelize')(session.Store);

const User = require('./models/user');
const Auto = require('./models/auto');
const Cliente = require('./models/cliente');
const Rental = require('./models/rental');

User.hasMany(Rental);
Rental.belongsTo(User);
Cliente.hasOne(Rental);
Rental.belongsTo(Cliente);
Auto.hasMany(Rental);
Rental.belongsTo(Auto);

const app = express();

app.set('view engine', 'html');
nunjucks.configure('views', {
  autoescape: true,
  express: app,
});

const csrfProtection = csrf();

const sequelize = require('./routes/util/db');

const myStore = new SequelizeStore({
  db: sequelize,
});

const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, 'uploads/img');
  },
  filename(req, file, cb) {
    cb(null, `${file.fieldname}-${Date.now()}`);
  },
});

app.use(multer({ storage }).single('imagen'));
app.use(express.static(path.join(__dirname, 'public')));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(session({
  secret: 'my secret',
  resave: false,
  saveUninitialized: false,
  store: myStore,
}));
app.use(csrfProtection);

app.use((req, res, next) => {
  res.locals.isAuthenticated = req.session.isLoggedIn;
  res.locals.csrfToken = req.csrfToken();
  next();
});

const authRoutes = require('./routes/auth');
const crudAutosRoutes = require('./routes/crud-autos');
const clientsRoutes = require('./routes/clients');

app.use(authRoutes);
app.use(crudAutosRoutes);
app.use(clientsRoutes);

app.use('/', (req, res) => {
  res.status(404).render('errors/404');
});
// eslint-disable-next-line no-unused-vars
app.use((err, req, res, next) => {
  // eslint-disable-next-line no-console
  console.log(err);
  res.status(500).render('errors/500');
});

module.exports = app;
