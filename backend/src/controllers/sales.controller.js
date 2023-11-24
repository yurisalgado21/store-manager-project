const { salesService } = require('../services');
const mapStatusHTTP = require('../utils/mapStatusHTTP');

const createSalesProduct = async (req, res) => {
  const salesArray = req.body;
  const { status, data } = await salesService.createSales(salesArray);
  return res.status(mapStatusHTTP(status)).json(data);
};

module.exports = {
  createSalesProduct,
};