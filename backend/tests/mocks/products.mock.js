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

const productFromDB = {
  id: 1,
  name: 'Martelo de Thor',
};

const productNotFoundFromDB = { status: 'NOT_FOUND', message: 'Product not found' };

module.exports = {
  productFromDB,
  productsFromDB,
  productNotFoundFromDB,
};