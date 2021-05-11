const ClientController = require('../clientController');
const Client = require('../../entity/clientEntity');
const ClientValidationError = require('../error/clientValidationError');

const serviceMock = {
  getById: jest.fn(() => Promise.resolve({})),
  getAll: jest.fn(() => Promise.resolve([])),
  save: jest.fn(),
  delete: jest.fn(),
};

const controller = new ClientController({}, serviceMock);

describe('clientController', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("index should calls service's getAll method and render index.njk", async () => {
    const renderMock = jest.fn();

    await controller.index({ session: { error: null } }, { render: renderMock });

    expect(serviceMock.getAll).toHaveBeenCalledTimes(1);
    expect(renderMock).toHaveBeenCalledTimes(1);
    expect(renderMock).toHaveBeenCalledWith('client/index', {
      clients: [],
      path: '/clients',
      error: null,
    });
  });

  test('create should rendern form.njk', async () => {
    const renderMock = jest.fn();

    await controller.create({ query: {} }, { render: renderMock });

    expect(renderMock).toHaveBeenCalledTimes(1);
    expect(renderMock).toHaveBeenCalledWith('client/form', {
      client: undefined,
      path: '/clients/add',
    });
  });

  test('view should render view.njk with the client', async () => {
    const renderMock = jest.fn();

    await controller.view({ params: { id: 1 } }, { render: renderMock });

    expect(renderMock).toHaveBeenCalledTimes(1);
    expect(renderMock).toHaveBeenCalledWith('client/view', {
      client: {},
      path: '/clients/view',
    });
  });

  test("create should calls service's getById method and render form.njk with a client", async () => {
    const renderMock = jest.fn();

    await controller.create({ query: { id: 1 } }, { render: renderMock });

    expect(serviceMock.getById).toHaveBeenCalledTimes(1);
    expect(renderMock).toHaveBeenCalledTimes(1);
    expect(renderMock).toHaveBeenCalledWith('client/form', {
      client: {},
      path: '/clients/add',
    });
  });

  test("create should calls service's save method 1 time and redirect", async () => {
    const redirectMock = jest.fn();
    const bodyMock = new Client({
      id: 1,
      nombres: 'name',
      apellidos: 'surname',
      tipoDocumento: 'D.N.I.',
      numeroDocumento: '12345667',
      fechaNacimiento: '10/10/2010',
      nacionalidad: 'Argentina',
      direccion: 'adress 123',
      telefono: '1122334455',
      email: 'user@email.com',
    });

    await controller.save({ body: bodyMock }, { redirect: redirectMock });

    expect(serviceMock.save).toHaveBeenCalledTimes(1);
    expect(serviceMock.save).toHaveBeenCalledWith(bodyMock);
    expect(redirectMock).toHaveBeenCalledWith('/clients');
  });

  test('save should throw an error and render form.njk with the client', async () => {
    const renderMock = jest.fn();

    const bodyMock = new Client({
      id: 1,
      nombres: '',
      apellidos: '',
      tipoDocumento: 'D.N.I.',
      numeroDocumento: '12345667',
      fechaNacimiento: '10/10/2010',
      nacionalidad: 'Argentina',
      direccion: 'adress 123',
      telefono: '1122334455',
      email: 'user@email.com',
    });

    expect(async () => {
      await controller.save({ body: bodyMock }, { render: renderMock });
    }).rejects.toThrow(ClientValidationError);
    expect(renderMock).toHaveBeenCalledTimes(1);
    expect(renderMock).toHaveBeenCalledWith('client/form', {
      path: '/clients/add',
      client: bodyMock,
      error: new ClientValidationError('Ingrese el nombre del cliente.'),
    });
  });

  test("delete should calls service's delete method with the client and redirect", async () => {
    const redirectMock = jest.fn();

    await controller.delete({ params: { id: 1 } }, { redirect: redirectMock });

    expect(serviceMock.delete).toHaveBeenCalledTimes(1);
    expect(serviceMock.delete).toHaveBeenCalledWith({});
  });
});
