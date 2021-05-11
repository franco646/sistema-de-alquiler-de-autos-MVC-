const AutoController = require('../autoController');
const Auto = require('../../entity/auto');

const serviceMock = {
  getAll: jest.fn(() => Promise.resolve([])),
  save: jest.fn(),
  getById: jest.fn(() => Promise.resolve({})),
  delete: jest.fn(),
};

const controller = new AutoController({}, {}, serviceMock);

describe('AutoController', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('index should render index.njk', async () => {
    const renderMock = jest.fn();

    await controller.index({ session: { error: null } }, { render: renderMock });

    expect(renderMock).toHaveBeenCalledTimes(1);
    expect(renderMock).toHaveBeenCalledWith('car/index', {
      autos: [],
      error: null,
      path: '/cars',
    });
  });

  test('view should call the service and render view.njk', async () => {
    const renderMock = jest.fn();

    await controller.view({ params: { id: 1 } }, { render: renderMock });

    expect(serviceMock.getById).toHaveBeenCalledTimes(1);
    expect(serviceMock.getById).toHaveBeenCalledWith(1);

    expect(renderMock).toHaveBeenCalledTimes(1);
    expect(renderMock).toHaveBeenCalledWith('car/view', {
      auto: {},
      path: '/cars/view',
    });
  });

  test('create should render form.njk', async () => {
    const renderMock = jest.fn();

    await controller.create({ query: {} }, { render: renderMock });

    expect(renderMock).toHaveBeenCalledTimes(1);
    expect(renderMock).toHaveBeenCalledWith('car/form', {
      auto: undefined,
      path: '/cars/add',
    });
  });

  test('create should call the service and render form.njk with a car loaded', async () => {
    const renderMock = jest.fn();

    await controller.create({ query: { id: 1 } }, { render: renderMock });

    expect(serviceMock.getById).toHaveBeenCalledTimes(1);
    expect(serviceMock.getById).toHaveBeenCalledWith(1);

    expect(renderMock).toHaveBeenCalledTimes(1);
    expect(renderMock).toHaveBeenCalledWith('car/form', {
      auto: {},
      path: '/cars/add',
    });
  });

  test('save should call the service and redirect to /cars', async () => {
    const redirectMock = jest.fn();
    const bodyMock = new Auto({
      id: 1,
      marca: 'Chevrolet',
      modelo: 'Corsa',
      año: '2005',
      kms: '123456',
      color: 'Blanco',
      imagen: 'ejemple/imagen.png',
      aireAcondicionado: 'no',
      pasajeros: 3,
      manualAutomatico: 'manual',
      precioAlquilerPorDia: '1234',
    });

    await controller.save({ body: bodyMock }, { redirect: redirectMock });

    expect(redirectMock).toHaveBeenCalledTimes(1);
    expect(redirectMock).toHaveBeenCalledWith('/cars');
  });

  test('delete should get the car and call the service and redirect to /cars', async () => {
    const FAKE_AUTO = new Auto({ id: 1 });
    serviceMock.getById.mockImplementationOnce(() => Promise.resolve(FAKE_AUTO));
    const redirectMock = jest.fn();

    await controller.delete({ params: { id: 1 } }, { redirect: redirectMock });

    expect(serviceMock.delete).toHaveBeenCalledTimes(1);
    expect(serviceMock.delete).toHaveBeenCalledWith(FAKE_AUTO);

    expect(redirectMock).toHaveBeenCalledTimes(1);
    expect(redirectMock).toHaveBeenCalledWith('/cars');
  });
});
