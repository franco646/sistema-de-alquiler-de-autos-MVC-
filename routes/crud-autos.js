const express = require('express');

const router = express.Router();

const autosController = require('../controller/crud-autos');

const isAuth = require('../middleware/is-auth');
const validateAuto = require('../middleware/auto-validator');

router.get('/', autosController.getHome);

router.get('/all-cars', autosController.getAllCars);

router.get('/add-car', isAuth, autosController.getAddCar);

router.post('/add-car', isAuth, validateAuto, autosController.postAddCar);

router.get('/edit-car/:carId', isAuth, autosController.getEditCar);

router.post('/edit-car/:carId', validateAuto, isAuth, autosController.postEditCar);

router.get('/car-detail/:carId', autosController.getCarDetail);

router.post('/delete-car/:carId', isAuth, autosController.postDeleteCar);

module.exports = router;
