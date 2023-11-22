const camelize = require('camelize');
const connection = require('../db/connection');

const findSalesById = async (id) => {
  const [sale] = await connection.execute(`SELECT
s.date, sp.product_id, sp.quantity
FROM sales_products AS sp
INNER JOIN sales AS s
ON s.id = sp.sale_id
WHERE sale_id = ?`, [id]);
  return camelize(sale);
};

const findAllSales = async () => {
  const [sales] = await connection.execute(`SELECT
   sp.sale_id, s.date, sp.product_id, sp.quantity 
   FROM sales_products AS sp 
   INNER JOIN sales AS s ON s.id = sp.sale_id ORDER BY sp.sale_id, sp.product_id`);
   
  return camelize(sales);
};

const s = async () => {
  
};
const e = async () => {
  
};
const r = async () => {
  
};
const i = async () => {
  
};

module.exports = {
  findSalesById,
  findAllSales,
  s,
  e,
  r,
  i,
};