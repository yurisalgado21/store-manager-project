const chai = require('chai');

const { expect } = chai;
const sinon = require('sinon');
const salesService = require('../../../src/services/sales.service');
const salesModels = require('../../../src/models/sales.model');

const dataAllSales = [
  {
    saleId: 1,
    date: '2023-11-27T14:36:20.000Z',
    productId: 1,
    quantity: 5,
  },
  {
    saleId: 1,
    date: '2023-11-27T14:36:20.000Z',
    productId: 2,
    quantity: 10,
  },
  {
    saleId: 2,
    date: '2023-11-27T14:36:20.000Z',
    productId: 3,
    quantity: 15,
  },
];

describe('Realizando Testes - SALES SERVICE:', function () {
  it('Buscando o sale com id corretamente', async function () {
    sinon.stub(salesModels, 'findSalesById').resolves([
      {
        date: '2023-11-27T13:56:22.000Z',
        productId: 3,
        quantity: 15,
      },
    ]);
    const input = 1;
    const responseService = await salesService.findSalesById(input);
    expect(responseService.status).to.equal('SUCCESSFUL');
    expect(responseService.data).to.be.deep.equal([
      {
        date: '2023-11-27T13:56:22.000Z',
        productId: 3,
        quantity: 15,
      },
    ]);
  });

  it('Busacando todos os sales e retornando corretamente', async function () {
    sinon.stub(salesModels, 'findAllSales').resolves(dataAllSales);
    const responseService = await salesService.findAllSales();
    expect(responseService.status).to.equal('SUCCESSFUL');
    expect(responseService.data).to.be.deep.equal(dataAllSales);
  });

  it('Não retornando o sale com id errado', async function () {
    sinon.stub(salesModels, 'findSalesById').resolves({
      message: 'Sale not found',
    });
    const input = 999999;
    const responseService = await salesService.findSalesById(input);
    // expect(responseService.status).to.equal('NOT_FOUND');
    expect(responseService.data).to.be.deep.equal({
      message: 'Sale not found',
    });
  });

  it('Cadastrando sales corretamente', async function () {
    sinon.stub(salesModels, 'insert').resolves(3);
    sinon.stub(salesModels, 'returnSalesById').resolves([
      {
        productId: 1,
        quantity: 1,
      },
      {
        productId: 2,
        quantity: 5,
      },
    ]);
    const responseService = await salesService.createSales([
      {
        productId: 1,
        quantity: 1,
      },
      {
        productId: 2,
        quantity: 5,
      },
    ]);
    expect(responseService.status).to.equal('CREATED');
    expect(responseService.data).to.deep.equal({
      id: 3,
      itemsSold: [
        {
          productId: 1,
          quantity: 1,
        },
        {
          productId: 2,
          quantity: 5,
        },
      ],
    });
  });
  afterEach(function () {
    sinon.restore();
  });
});