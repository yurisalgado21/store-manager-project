const connection = require('../db/connection');

const y = () => {
  
};

const findById = async (id) => {
  const [[product]] = await connection.execute(
    'SELECT * FROM products WHERE id = ?',
    [id],
  );
  return product;
};

const findAllProducts = async () => {
  const [products] = await connection.execute('SELECT * FROM products');
  return products;
};

const insert = async (nameProduct) => {
  const [{ insertId }] = await connection.execute(
    'INSERT INTO products (name) VALUE (?);',
    [nameProduct],
  );
  console.log(insertId);
  return insertId;
};

module.exports = {
  findAllProducts,
  findById,
  insert,
  y,
};