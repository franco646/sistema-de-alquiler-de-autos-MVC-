const fs = require('fs');
const { validationResult } = require('express-validator');
const Auto = require('../models/auto');

const AUTOS_POR_PAGINA = 2;

exports.getHome = (req, res, next) => {
  const { page } = req.query;

  Auto.findAndCountAll({
    limit: AUTOS_POR_PAGINA,
    offset: (page - 1) * AUTOS_POR_PAGINA,
    where: { disponible: true },
  })

    .then((autos) => {
      res.render('carsList', {
        path: '/',
        autos: autos.rows,
        cantidadDePaginas: autos.count / AUTOS_POR_PAGINA,
      });
    })
    .catch((err) => {
      next(err);
    });
};

exports.getAllCars = (req, res, next) => {
  Auto.findAll()
    .then((autos) => {
      res.render('carsList', {
        path: '/all-cars',
        autos,
      });
    })
    .catch((err) => {
      next(err);
    });
};

exports.getAddCar = (req, res) => {
  res.render('form', {
    path: '/add-car',
  });
};

exports.postAddCar = (req, res, next) => {
  const { marca } = req.body;
  const { modelo } = req.body;
  const { año } = req.body;
  const { kms } = req.body;
  const { color } = req.body;
  const { aireAcondicionado } = req.body;
  const { pasajeros } = req.body;
  const manualAutomatico = req.body.caja;
  const precioAlquilerPorDia = req.body.precioAlquiler;

  const errores = validationResult(req);
  if (!errores.isEmpty()) {
    fs.unlink(req.file.path, () => {});
    return res.status(422).render('form', {
      errores: errores.array(),
      marca,
      modelo,
      año,
      kms,
      color,
      aireAcondicionado,
      pasajeros,
      manualAutomatico,
      precioAlquilerPorDia,
    });
  }

  return Auto.create({
    marca,
    modelo,
    año,
    kms,
    color,
    imagen: req.file.path,
    aireAcondicionado,
    pasajeros,
    manualAutomatico,
    precioAlquilerPorDia,
    disponible: true,
  })
    .then(() => {
      res.redirect('/');
    })
    .catch((err) => {
      next(err);
    });
};

exports.getEditCar = (req, res, next) => {
  const { carId } = req.params;
  Auto.findByPk(carId)
    .then((auto) => {
      res.render('form', {
        auto,
        editionMode: true,
      });
    })
    .catch((err) => {
      next(err);
    });
};

exports.postEditCar = (req, res, next) => {
  const { carId } = req.params;
  Auto.findByPk(carId)
    .then((auto) => {
      if (req.file) {
        fs.unlink(auto.imagen, () => {});
        auto.imagen = req.file.path;
      }
      auto.marca = req.body.marca;
      auto.modelo = req.body.modelo;
      auto.año = req.body.año;
      auto.kms = req.body.kms;
      auto.color = req.body.color;
      auto.aireAcondicionado = req.body.aireAcondicionado;
      auto.pasajeros = req.body.pasajeros;
      auto.manualAutomatico = req.body.caja;
      auto.precioAlquilerPorDia = req.body.precioAlquiler;

      const todosLosErrores = validationResult(req);
      const errores = todosLosErrores.array().filter((error) => error.param !== 'imagen');
      if (errores.length > 0) {
        return res.status(422).render('form', {
          errores,
          editionMode: true,
          auto,
        });
      }

      return auto.save()
        .then(() => {
          res.redirect('/');
        });
    })
    .catch((err) => {
      next(err);
    });
};

exports.postDeleteCar = (req, res, next) => {
  const { carId } = req.params;
  Auto.findByPk(carId)
    .then((auto) => {
      fs.unlinkSync(auto.imagen, () => { });
      return auto.destroy();
    })
    .then(() => {
      res.redirect('/');
    })
    .catch((err) => {
      next(err);
    });
};

exports.getCarDetail = (req, res, next) => {
  const { carId } = req.params;
  Auto.findByPk(carId)
    .then((auto) => {
      auto.getRentals({ where: { autoId: carId } })
        .then((rentals) => {
          const rental = rentals[rentals.length - 1];
          res.render('carDetail', {
            auto,
            rental,
          });
        });
    })
    .catch((err) => {
      next(err);
    });
};
