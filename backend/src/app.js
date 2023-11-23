const express = require('express');
const { productsSevice, salesService } = require('./services');
const { validateProduct } = require('./middlewares/validateProducts');
const { productsController } = require('./controllers');

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

module.exports = app;
