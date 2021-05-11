const { fromDataToEntity } = require('../mapper/clientMapper');
const clientValidationSchema = require('../util/validation/clientSchema');
const ClientValidationError = require('./error/clientValidationError');

module.exports = class ClientController {
  constructor(authMiddleware, clientService) {
    this.ROUTE_BASE = '/clients';
    this.authMiddleware = authMiddleware;
    this.clientService = clientService;
  }

  configureRoutes(app) {
    const ROUTE = this.ROUTE_BASE;

    app.get(ROUTE, this.authMiddleware, this.index.bind(this));
    app.get(`${ROUTE}/add`, this.authMiddleware, this.create.bind(this));
    app.post(`${ROUTE}/add`, this.authMiddleware, this.save.bind(this));
    app.get(`${ROUTE}/view/:id`, this.authMiddleware, this.view.bind(this));
    app.post(`${ROUTE}/delete/:id`, this.authMiddleware, this.delete.bind(this));
  }

  async index(req, res) {
    const clients = await this.clientService.getAll();
    res.render('client/index', {
      clients,
      path: this.ROUTE_BASE,
      error: req.session.error,
    });
    req.session.error = null;
  }

  async create(req, res) {
    const { id } = req.query;
    try {
      let client;
      if (id) {
        client = await this.clientService.getById(id);
      }
      res.render('client/form', { path: `${this.ROUTE_BASE}/add`, client });
    } catch (error) {
      req.session.error = `¡Algo salió mal! ${error.message}`;
      res.redirect(this.ROUTE_BASE);
    }
  }

  async save(req, res) {
    const client = fromDataToEntity(req.body);
    try {
      const { error } = clientValidationSchema.validate(client);
      if (error) {
        throw new ClientValidationError(error.message);
      }
      await this.clientService.save(client);
      return res.redirect(this.ROUTE_BASE);
    } catch (error) {
      if (error instanceof ClientValidationError) {
        return res.render('client/form', {
          path: `${this.ROUTE_BASE}/add`,
          client,
          error,
        });
      }
      req.session.error = `¡Algo salió mal! ${error.message}`;
      return res.redirect(this.ROUTE_BASE);
    }
  }

  async view(req, res) {
    const { id } = req.params;
    try {
      const client = await this.clientService.getById(id);
      res.render('client/view', { client, path: `${this.ROUTE_BASE}/view` });
    } catch (error) {
      req.session.error = `¡Algo salió mal! ${error.message}`;
      res.redirect(this.ROUTE_BASE);
    }
  }

  async delete(req, res) {
    const { id } = req.params;
    try {
      const client = await this.clientService.getById(id);
      await this.clientService.delete(client);
      res.redirect(this.ROUTE_BASE);
    } catch (error) {
      req.session.error = `¡Algo salió mal! ${error.message}`;
      res.redirect(this.ROUTE_BASE);
    }
  }
};
