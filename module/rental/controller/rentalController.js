const { fromDataToEntity } = require('../mapper/rentalMapper');
const RentalValidationError = require('../util/validation/error/RentalValidationError');
const rentalValidationSchema = require('../util/validation/rentalValidationSchema');

/* eslint-disable class-methods-use-this */
module.exports = class RentalController {
  constructor(authMiddleware, rentalService, clientService, autoService) {
    this.ROUTE_BASE = '/rentals';
    this.authMiddleware = authMiddleware;
    this.rentalService = rentalService;
    this.clientService = clientService;
    this.autoService = autoService;
  }

  configureRoutes(app) {
    const ROUTE = this.ROUTE_BASE;
    app.get(ROUTE, this.authMiddleware, this.index.bind(this));
    app.get(`${ROUTE}/add`, this.authMiddleware, this.create.bind(this));
    app.post(`${ROUTE}/add`, this.authMiddleware, this.save.bind(this));
    app.get(`${ROUTE}/view/:id`, this.authMiddleware, this.view.bind(this));
    app.post(`${ROUTE}/delete/:id`, this.authMiddleware, this.delete.bind(this));
    app.post(`${ROUTE}/finish/:id`, this.authMiddleware, this.finish.bind(this));
  }

  async index(req, res) {
    const rentals = await this.rentalService.getAll();
    res.render('rental/index', {
      rentals,
      path: this.ROUTE_BASE,
      error: req.session.error,
    });
    req.session.error = null;
  }

  async view(req, res) {
    const { id } = req.params;
    try {
      const rental = await this.rentalService.getById(id);
      res.render('rental/view', { rental, path: `${this.ROUTE_BASE}/view` });
    } catch (error) {
      req.session.error = `¡Algo salió mal! ${error.message}`;
      res.redirect(this.ROUTE_BASE);
    }
  }

  async finish(req, res) {
    const { id } = req.params;
    try {
      const rental = await this.rentalService.getById(id);
      await this.rentalService.finish(rental);
      res.redirect('back');
    } catch (error) {
      req.session.error = `¡Algo salió mal! ${error.message}`;
      res.redirect(this.ROUTE_BASE);
    }
  }

  async create(req, res) {
    const { clientId, carId } = req.query;
    try {
      const cars = await this.autoService.getAll();
      const clients = await this.clientService.getAll();

      if (cars.length === 0) {
        req.session.error = 'Para crear un alquiler primero debes crear un auto.';
        return res.redirect('/cars');
      }
      if (clients.length === 0) {
        req.session.error = 'Para crear un alquiler primero debes crear un cliente.';
        return res.redirect('/clients');
      }
      return res.render('rental/form', {
        path: `${this.ROUTE_BASE}/add`,
        cars,
        clients,
        clientId,
        carId,
      });
    } catch (error) {
      req.session.error = `¡Algo salió mal! ${error.message}`;
      return res.redirect(this.ROUTE_BASE);
    }
  }

  async save(req, res) {
    const { user } = req.session;
    const rental = fromDataToEntity({ ...req.body, user });

    try {
      const { error } = rentalValidationSchema.validate(rental);
      if (error) {
        throw new RentalValidationError(error.message);
      }
      await this.rentalService.save(rental);

      return res.redirect('/rentals');
    } catch (error) {
      if (error instanceof RentalValidationError) {
        const cars = await this.autoService.getAll();
        const clients = await this.clientService.getAll();
        return res.render('rental/form', {
          path: `${this.ROUTE_BASE}/add`,
          rental,
          clientId: rental.ClientId,
          carId: rental.AutoId,
          cars,
          clients,
          error,
        });
      }
      req.session.error = `¡Algo salió mal! ${error.message}`;
      return res.redirect(this.ROUTE_BASE);
    }
  }

  async delete(req, res) {
    const { id } = req.params;
    try {
      const rental = await this.rentalService.getById(id);
      await this.rentalService.delete(rental);
      res.redirect(this.ROUTE_BASE);
    } catch (error) {
      req.session.error = `¡Algo salió mal! ${error.message}`;
      res.redirect(this.ROUTE_BASE);
    }
  }
};
