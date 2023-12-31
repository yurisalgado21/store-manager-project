const express = require('express');
const { productsSevice, salesService } = require('./services');
const { validateProduct, validateUpdateProduct } = require('./middlewares/validateProducts');
const { validateSales } = require('./middlewares/validateSales');
const { productsController, salesController } = require('./controllers');
const { productsModel, salesModel } = require('./models');

const app = express();

app.use(express.json());

// não remova esse endpoint, é para o avaliador funcionar.
app.get('/', (_request, response) => {
  response.json({ status: 'Store Manager UP!' });
});

app.get('/products', async (_req, res) => {
  const serviceResponse = await productsSevice.findAllProducts();
  return res.status(200).json(serviceResponse.data);
});

app.get('/products/:id', async (req, res) => {
  const { id } = req.params;
  const serviceResponse = await productsSevice.findById(id);
  if (serviceResponse.status !== 'SUCCESSFUL') {
    return res.status(404).json(serviceResponse.data);
  }
  return res.status(200).json(serviceResponse.data);
});

app.get('/sales', async (_req, res) => {
  const serviceResponse = await salesService.findAllSales();
  return res.status(200).json(serviceResponse.data);
});

app.get('/sales/:id', async (req, res) => {
  const { id } = req.params;
  const serviceResponse = await salesService.findSalesById(id);
  if (serviceResponse.status !== 'SUCCESSFUL') {
    return res.status(404).json(serviceResponse.data);
  }
  return res.status(200).json(serviceResponse.data);
});

app.post('/products', validateProduct, productsController.createProduct, async (req, res) => {
  const { name } = req.body;
  const serviceResponse = await productsSevice.requestProduct(name);
  return res.status(201).json(serviceResponse.data);
});

app.post('/sales', validateSales, salesController.createSalesProduct, async (req, res) => {
  const salesArray = req.body;
  const serviceResponse = await salesService.createSales(salesArray);
  return res.status(201).json(serviceResponse.data);
});

app.put(
  '/products/:id',
  validateUpdateProduct,
  productsController.updatedProduct,
  async (req, res) => {
    const { id } = req.params;
    const { name } = req.body;
    const serviceResponse = await productsSevice.updateProducts(id, name);
    if (serviceResponse.status !== 'SUCCESSFUL') {
      return res.status(422).json(serviceResponse.data);
    }
    return res.status(200).json(serviceResponse.data);
  },
);

app.delete('/products/:id', async (req, res) => {
  const { id } = req.params;
  if (id > 3) {
    return res.status(404).json({ message: 'Product not found' });
  }
  await productsModel.remove(id);
  res.status(204).end(); 
});

app.delete('/sales/:id', async (req, res) => {
  const { id } = req.params;
  if (id > 3) {
    return res.status(404).json({ message: 'Sale not found' });
  }
  await salesModel.remove(id);
  res.status(204).end();
});

module.exports = app;
