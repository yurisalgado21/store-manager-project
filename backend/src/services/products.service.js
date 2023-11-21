const { productsModel } = require('../models');

const findAllProducts = async () => {
  const products = await productsModel.findAllProducts();
  return { status: 'SUCCESSFUL', data: products };
};

const findById = async (id) => {
  const product = await productsModel.findById(id);
  if (!product) return { status: 'NOT_FOUND', data: { message: 'Product not found' } };
  return { status: 'SUCCESSFUL', data: product };
};

module.exports = {
  findAllProducts,
  findById,
};