const AutoValidationError = require('./error/validationError');
const { fromDataToEntity } = require('../mapper/autoMapper');
const CarValidationSchema = require('../util/validation/CarValidationSchema');

module.exports = class AutoController {
  constructor(uploadMiddleware, authMiddleware, AutoService) {
    this.ROUTE_BASE = '/cars';
    this.uploadMiddleware = uploadMiddleware;
    this.authMiddleware = authMiddleware;
    this.autoService = AutoService;
  }

  configureRoutes(app) {
    const ROUTE = this.ROUTE_BASE;

    app.get(`${ROUTE}`, this.authMiddleware, this.index.bind(this));
    app.get(`${ROUTE}/add`, this.authMiddleware, this.create.bind(this));
    app.post(`${ROUTE}/add`, this.authMiddleware, this.uploadMiddleware, this.save.bind(this));
    app.get(`${ROUTE}/view/:id`, this.authMiddleware, this.view.bind(this));
    app.post(`${ROUTE}/delete/:id`, this.authMiddleware, this.delete.bind(this));
  }

  async index(req, res) {
    const cars = await this.autoService.getAll();
    res.render('car/index', {
      autos: cars,
      path: this.ROUTE_BASE,
      error: req.session.error,
    });
    req.session.error = null;
  }

  async view(req, res) {
    const { id } = req.params;
    try {
      const car = await this.autoService.getById(id);
      res.render('car/view', { auto: car, path: `${this.ROUTE_BASE}/view` });
    } catch (error) {
      req.session.error = `¡Algo salió mal! ${error.message}`;
      res.redirect(this.ROUTE_BASE);
    }
  }

  async create(req, res) {
    const { id } = req.query;
    try {
      let car;
      if (id) {
        car = await this.autoService.getById(id);
      }
      res.render('car/form', { auto: car, path: `${this.ROUTE_BASE}/add` });
    } catch (error) {
      req.session.error = `¡Algo salió mal! ${error.message}`;
      res.redirect(this.ROUTE_BASE);
    }
  }

  async save(req, res) {
    const car = fromDataToEntity(req.body);
    if (req.file) {
      car.imagen = req.file.path;
    }
    try {
      const { error } = CarValidationSchema.validate(car);
      if (error) {
        throw new AutoValidationError(error.message);
      }

      await this.autoService.save(car);
      return res.redirect(this.ROUTE_BASE);
    } catch (error) {
      if (error instanceof AutoValidationError) {
        return res.render('car/form', { auto: car, error, path: `${this.ROUTE_BASE}/add` });
      }
      req.session.error = `¡Algo salió mal! ${error.message}`;
      return res.redirect(this.ROUTE_BASE);
    }
  }

  async delete(req, res) {
    const { id } = req.params;
    try {
      const car = await this.autoService.getById(id);
      await this.autoService.delete(car);
      res.redirect('/cars');
    } catch (error) {
      req.session.error = `¡Algo salió mal! ${error.message}`;
      res.redirect(this.ROUTE_BASE);
    }
  }
};
