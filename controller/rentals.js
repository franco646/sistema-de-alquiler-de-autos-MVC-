const { validationResult } = require('express-validator');
const PDFDocument = require('pdfkit');
const path = require('path');
const fs = require('fs');
const User = require('../models/user');
const Auto = require('../models/auto');
const Cliente = require('../models/cliente');
const Rental = require('../models/rental');

exports.getAddClient = (req, res, next) => {
  const { carId } = req.params;
  Auto.findByPk(carId)
    .then((auto) => {
      res.render('rentals/form', {
        auto,
      });
    })
    .catch((err) => {
      next(err);
    });
};

exports.postAddClient = (req, res, next) => {
  const { carId } = req.body;
  const { precioAlquilerPorDia } = req.body;

  const { nombres } = req.body;
  const { apellidos } = req.body;
  const { tipoDocumento } = req.body;
  const { numeroDocumento } = req.body;
  const { nacionalidad } = req.body;
  const { direccion } = req.body;
  const { telefono } = req.body;
  const { email } = req.body;
  const { fechaNacimiento } = req.body;
  const { alquilerDesde } = req.body;
  const { alquilerHasta } = req.body;
  const { medioDePago } = req.body;
  const { total } = req.body;

  const errores = validationResult(req);
  if (!errores.isEmpty()) {
    return res.status(422).render('rentals/form', {
      errores: errores.array(),
      auto: { id: carId, precioAlquilerPorDia },
      nombres,
      apellidos,
      tipoDocumento,
      numeroDocumento,
      fechaNacimiento,
      nacionalidad,
      direccion,
      telefono,
      email,
      alquilerDesde,
      alquilerHasta,
      medioDePago,
      total,
    });
  }

  return Cliente.create({
    nombres,
    apellidos,
    tipoDocumento,
    numeroDocumento,
    fechaNacimiento,
    nacionalidad,
    direccion,
    telefono,
    email,
  })
    .then((cliente) => User.findByPk(req.session.user.id)
      .then((user) => user.createRental({
        alquilerDesde,
        alquilerHasta,
        medioDePago,
        total,
        estado: 'Alquilado',
      }))
      .then((rental) => Auto.findByPk(carId)
        .then((auto) => {
          auto.disponible = false;
          rental.setAuto(auto);
          rental.setCliente(cliente);
          return auto.save();
        })))
    .then(() => {
      res.redirect('/rentals');
    })
    .catch((err) => {
      next(err);
    });
};

exports.getRentals = (req, res, next) => {
  Rental.findAll({
    where: { estado: 'Alquilado' },
    include: [
      { model: Auto },
      { model: Cliente },
    ],
  })
    .then((alquileres) => {
      res.render('rentals/carList', {
        path: '/rentals',
        alquileres,
      });
    })
    .catch((err) => {
      next(err);
    });
};

exports.getAllRentals = (req, res, next) => {
  Rental.findAll({
    include: [
      { model: Auto },
      { model: Cliente },
    ],
  })
    .then((alquileres) => {
      res.render('rentals/carList', {
        path: '/all-rentals',
        columnaEstado: true,
        alquileres,
      });
    })
    .catch((err) => {
      next(err);
    });
};

exports.getClientDetail = (req, res, next) => {
  const clienteId = req.params.clientId;
  Cliente.findByPk(clienteId)
    .then((cliente) => {
      cliente.getRental()
        .then((rental) => {
          res.render('rentals/clientDetail', {
            cliente,
            rental,
          });
        });
    })
    .catch((err) => {
      next(err);
    });
};

exports.postReturnCar = (req, res, next) => {
  const { rentalId } = req.params;
  Rental.findByPk(rentalId)
    .then((rental) => {
      rental.estado = 'Finalizado';
      rental.save();
      return rental.getAuto()
        .then((auto) => {
          auto.disponible = true;
          return auto.save();
        });
    })
    .then(() => {
      res.redirect('/rentals');
    })
    .catch((err) => {
      next(err);
    });
};

exports.postDeleteRental = (req, res, next) => {
  const { rentalId } = req.params;
  Rental.findByPk(rentalId)
    .then((rental) => {
      rental.getCliente()
        .then((cliente) => {
          cliente.destroy();
          rental.destroy();
        });
    })
    .then(() => {
      res.redirect('/all-rentals');
    })
    .catch((err) => {
      next(err);
    });
};

exports.getDownloadRental = (req, res, next) => {
  const { rentalId } = req.params;
  Rental.findByPk(rentalId)
    .then((rental) => {
      const namePDF = `${rental.id}.pdf`;
      const pathPDF = path.join('data', 'PDF', namePDF);

      const doc = new PDFDocument();
      doc.pipe(fs.createWriteStream(pathPDF));
      doc.pipe(res);

      doc.text('hola mundo');

      doc.end();
    })
    .catch((err) => {
      next(err);
    });
};
