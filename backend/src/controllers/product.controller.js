const { productsSevice } = require('../services');
const mapStatusHTTP = require('../utils/mapStatusHTTP');

const createProduct = async (req, res) => {
  const dataProduct = { ...req.body };
  const { name } = dataProduct;
  const { status, data } = await productsSevice.requestProduct(name);
  return res.status(mapStatusHTTP(status)).json(data);
};

const updatedProduct = async (req, res) => {
  const { id } = req.params;
  const dataProduct = { ...req.body };
  const { name } = dataProduct;
  const { status, data } = await productsSevice.updateProducts(id, name);
  return res.status(mapStatusHTTP(status)).json(data);
};

module.exports = {
  createProduct,
  updatedProduct,
};