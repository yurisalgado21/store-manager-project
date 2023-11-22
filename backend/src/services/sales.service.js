const { salesModel } = require('../models');

const findAllSales = async () => {
  const sales = await salesModel.findAllSales();
  return { status: 'SUCCESSFUL', data: sales };
};

const findSalesById = async (id) => {
  const sale = await salesModel.findSalesById(id);
  if (sale.length === 0) return { status: 'NOT_FOUND', data: { message: 'Sale not found' } };
  return { status: 'SUCCESSFUL', data: sale };
};

module.exports = {
  findAllSales,
  findSalesById,
};