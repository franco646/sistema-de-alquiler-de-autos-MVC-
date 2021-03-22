const bcrypt = require('bcryptjs');
const { validationResult } = require('express-validator');
const User = require('../models/user');

exports.getLogin = (req, res) => {
  res.render('auth/login');
};

exports.postLogin = (req, res, next) => {
  const { email } = req.body;
  const { contraseña } = req.body;

  const errores = validationResult(req);
  if (!errores.isEmpty()) {
    return res.status(422).render('auth/login', {
      errores: errores.array(),
      email,
      contraseña,
    });
  }

  return User.findOne({ where: { email } })
    .then((user) => {
      req.session.isLoggedIn = true;
      req.session.user = user;
      return req.session.save(() => {
        res.redirect('/');
      });
    })
    .catch((err) => {
      next(err);
    });
};

exports.postLogout = (req, res) => {
  req.session.destroy(() => {
    res.redirect('/login');
  });
};

exports.getSingup = (req, res) => {
  res.render('auth/singup');
};

exports.postSingup = (req, res, next) => {
  const { email } = req.body;
  const { contraseña } = req.body;
  const { confirmarContraseña } = req.body;

  const errores = validationResult(req);
  if (!errores.isEmpty()) {
    return res.status(422).render('auth/singup', {
      errores: errores.array(),
      email,
      contraseña,
      confirmarContraseña,
    });
  }

  return bcrypt.hash(contraseña, 12)
    .then((contraseñaEncriptada) => {
      const user = new User({
        email,
        contraseña: contraseñaEncriptada,
      });
      return user.save();
    })
    .then(() => {
      res.redirect('/login');
    })
    .catch((err) => {
      next(err);
    });
};
