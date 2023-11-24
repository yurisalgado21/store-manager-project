const chai = require('chai');

const { expect } = chai;
const sinon = require('sinon');
const sinonChai = require('sinon-chai');
const validateMiddleware = require('../../../src/middlewares/validateSales');
const { salesService } = require('../../../src/services');
// const { salesController } = require('../../../src/controllers');
const { salesResult } = require('../../mocks/sales.mock');

chai.use(sinonChai);

describe('Realizando testes - MIDDLEWARE SALES', function () {
  it('Inserindo sales corretamente', async function () {
    sinon.stub(salesService, 'createSales').resolves(salesResult);
      
    const req = {
      body: [
        {
          productId: 1,
          quantity: 1,
        },
        {
          productId: 2,
          quantity: 5,
        },
      ],
    };
    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
    };
    const next = sinon.stub().returnsThis();
      
    validateMiddleware.validateSales(req, res, next);
    expect(next).to.have.been.calledWith();
      
    // await salesController.createSalesProduct(req, res);
    // expect(res.status).to.have.been.calledWith(201);
    // expect(res.status).to.have.been.calledWith(salesData);
  });
});