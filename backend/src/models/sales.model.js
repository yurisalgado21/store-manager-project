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

const createDateInsert = async () => {
  const [{ insertId }] = await connection.execute(
    'INSERT INTO sales (date) VALUES (NOW())',
  );
  return insertId;
};

const insert = async (sales) => {
  const saleId = await createDateInsert();
  const insertPromisses = sales.map(async ({ productId, quantity }) => {
    await connection.execute(
      'INSERT INTO StoreManager.sales_products (sale_id, product_id, quantity) VALUES(?, ?, ?)',
      [saleId, productId, quantity],
    ); 
  });
  await Promise.all(insertPromisses);
  return saleId;
};

const returnSalesById = async (id) => {
  const [sale] = await connection.execute(
    `SELECT sp.product_id, sp.quantity 
    FROM sales_products AS sp 
    INNER JOIN sales AS s
    ON s.id = sp.sale_id
    WHERE s.id = ?`,
    [id],
  );
  return camelize(sale);
};

// SELECT s.id, sp.product_id, sp.quantity FROM sales_products AS sp
// INNER JOIN sales AS s
// WHERE s.id = 2

const s = async () => {
  
};
const e = async () => {
  
};
const r = async () => {
  
};
const i = async () => {
  
};

const remove = async (id) => {
  await connection.execute(
    'DELETE FROM sales WHERE id = ?',
    [id],
  );
};

module.exports = {
  findSalesById,
  findAllSales,
  insert,
  createDateInsert,
  returnSalesById,
  remove,
  s,
  e,
  r,
  i,
};