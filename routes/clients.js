const express = require('express');

const router = express.Router();

const rentalsController = require('../controller/rentals');

const isAuth = require('../middleware/is-auth');
const validateRental = require('../middleware/client-validator');

router.get('/add-client/:carId', isAuth, rentalsController.getAddClient);

router.post('/add-client', isAuth, validateRental, rentalsController.postAddClient);

router.get('/rentals', isAuth, rentalsController.getRentals);

router.get('/all-rentals', isAuth, rentalsController.getAllRentals);

router.get('/client-detail/:clientId', isAuth, rentalsController.getClientDetail);

router.post('/return-car/:rentalId', isAuth, rentalsController.postReturnCar);

router.post('/delete-rental/:rentalId', isAuth, rentalsController.postDeleteRental);

router.get('/download-rental-pdf/:rentalId', isAuth, rentalsController.getDownloadRental);

module.exports = router;
