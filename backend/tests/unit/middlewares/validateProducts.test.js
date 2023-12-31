const chai = require('chai');

const { expect } = chai;
const sinon = require('sinon');
const sinonChai = require('sinon-chai');
const validateMiddleware = require('../../../src/middlewares/validateProducts');
const { productsSevice } = require('../../../src/services');
const { productsController } = require('../../../src/controllers');
const { productFromService, productFromCreated, productUpdated } = require('../../mocks/products.mock');

chai.use(sinonChai);

describe('Realizando testes - MIDDLEWARE PRODUCTS', function () {
  it('Inserindo um novo produto corretamente', async function () {
    sinon.stub(productsSevice, 'requestProduct').resolves(productFromService);

    const req = {
      body: { name: 'Traje Demolidor' },
    };

    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(), 
    };
    const next = sinon.stub().returns();

    validateMiddleware.validateProduct(req, res, next);

    expect(next).to.have.been.calledWith();

    await productsController.createProduct(req, res);
    expect(res.status).to.have.been.calledWith(201);
    expect(res.json).to.have.been.calledWith(productFromCreated);

    //     // ...
    // const next = sinon.stub().returns(); // crie um stub
    // >
    // myMiddlewares.validateMiddleware(req, res, next); // passe o `next` para o middleware junto com o `req` e `res`
    // >
    // expect(next).to.have.been.calledWith(); // verifica se o `next` foi chamado pelo middleware
    // // ...
  });

  it('Atualizando dados do produto corretamente', async function () {
    sinon.stub(productsSevice, 'updateProducts').resolves(productUpdated);

    const req = {
      params: { id: 1 },
      body: { name: 'Machado do Thor Stormbreaker' },
    };
    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
    };
    const next = sinon.stub().returns();

    validateMiddleware.validateUpdateProduct(req, res, next);
    expect(next).to.have.been.calledWith();

    // await productsController.updatedProduct(req, res);
    // expect(res.status).to.have.been.calledWith(200);
    // expect(res.data).to.have.been.calledWith(productForUpdate);
  });

  afterEach(function () {
    sinon.restore();
  });
});