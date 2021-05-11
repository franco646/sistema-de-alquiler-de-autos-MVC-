const RentalController = require('../rentalController');
const Rental = require('../../entity/rentalEntity');

const rentalServiceMock = {
  save: jest.fn(),
  getById: jest.fn(() => Promise.resolve({})),
  finish: jest.fn(),
  getAll: jest.fn(() => Promise.resolve([])),
  delete: jest.fn(),
};

const clientServiceMock = {
  getAll: jest.fn(() => Promise.resolve([{}])),
};

const autoServiceMock = {
  getAll: jest.fn(() => Promise.resolve([{}])),
};

const controller = new RentalController({}, rentalServiceMock, clientServiceMock, autoServiceMock);

describe('rentalController', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("index should calls service's getAll method and render index.njk", async () => {
    const renderMock = jest.fn();

    await controller.index({ session: { error: null } }, { render: renderMock });
    expect(rentalServiceMock.getAll).toHaveBeenCalledTimes(1);
    expect(renderMock).toHaveBeenCalledTimes(1);
    expect(renderMock).toHaveBeenCalledWith('rental/index', {
      rentals: [],
      path: '/rentals',
      error: null,
    });
  });

  test("view should calls service's getById method and render view.njk", async () => {
    const renderMock = jest.fn();

    await controller.view({ params: { id: 1 } }, { render: renderMock });
    expect(rentalServiceMock.getById).toHaveBeenCalledTimes(1);
    expect(renderMock).toHaveBeenCalledTimes(1);
    expect(renderMock).toHaveBeenCalledWith('rental/view', {
      rental: {},
      path: '/rentals/view',
    });
  });

  test("finish should calls service's getById and finish methods, then redirect", async () => {
    const redirectMock = jest.fn();

    await controller.finish({ params: { id: 1 } }, { redirect: redirectMock });

    expect(rentalServiceMock.getById).toHaveBeenCalledTimes(1);
    expect(rentalServiceMock.finish).toHaveBeenCalledTimes(1);
    expect(rentalServiceMock.finish).toHaveBeenCalledWith({});
    expect(redirectMock).toHaveBeenCalledTimes(1);
    expect(redirectMock).toHaveBeenCalledWith('back');
  });

  test("create should calls car and client service's getAll method and render form.njk", async () => {
    const renderMock = jest.fn();

    await controller.create({ query: {} }, { render: renderMock });

    expect(autoServiceMock.getAll).toHaveBeenCalledTimes(1);
    expect(clientServiceMock.getAll).toHaveBeenCalledTimes(1);
    expect(renderMock).toHaveBeenCalledTimes(1);
    expect(renderMock).toHaveBeenCalledWith('rental/form', {
      path: '/rentals/add',
      cars: [{}],
      clients: [{}],
      clientId: undefined,
      carId: undefined,
    });
  });

  test("save should class service's save method and redirect", async () => {
    const redirectMock = jest.fn();

    const bodyMock = new Rental({
      id: 1,
      alquilerDesde: '10/10/2010',
      alquilerHasta: '11/10/2010',
      medioDePago: 'Efectivo',
    });

    await controller.save({ body: bodyMock, session: { user: {} } }, { redirect: redirectMock });
    expect(rentalServiceMock.save).toHaveBeenCalledTimes(1);
    expect(redirectMock).toHaveBeenCalledTimes(1);
    expect(redirectMock).toHaveBeenCalledWith('/rentals');
  });

  test("delete should calls service's getById and delete methods, then redirect", async () => {
    const redirectMock = jest.fn();

    await controller.delete({ params: { id: 1 } }, { redirect: redirectMock });

    expect(rentalServiceMock.delete).toHaveBeenCalledTimes(1);
    expect(rentalServiceMock.delete).toHaveBeenCalledWith({});
    expect(redirectMock).toHaveBeenCalledTimes(1);
    expect(redirectMock).toHaveBeenCalledWith('/rentals');
  });
});
