const productsFromDB = [
  {
    id: 1,
    name: 'Martelo de Thor',
  },
  {
    id: 2,
    name: 'Traje de encolhimento',
  },
];

const productsReturns = [
  {
    id: 1,
    name: 'Martelo de Thor',
  },
  {
    id: 2,
    name: 'Traje de encolhimento',
  },
  {
    id: 3,
    name: 'Escudo do Capitão América',
  },
];

const productFromDB = {
  id: 1,
  name: 'Martelo de Thor',
};

const productNotFoundFromDB = { status: 'NOT_FOUND', message: 'Product not found' };

const productFromCreated = {
  id: 5,
  name: 'Traje Demolidor',
};

const productFromService = {
  status: 'CREATED',
  data: productFromCreated,
};

const productForUpdate = {
  name: 'Machado do Thor Stormbreaker',
};

const productUpdated = { id: 1, name: 'Machado do Thor Stormbreaker' };

module.exports = {
  productFromDB,
  productsFromDB,
  productNotFoundFromDB,
  productFromService,
  productFromCreated,
  productForUpdate,
  productUpdated,
  productsReturns,
};