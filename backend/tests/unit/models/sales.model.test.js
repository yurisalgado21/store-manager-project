const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');

const { expect } = chai;
const connection = require('../../../src/db/connection');
const { salesModel } = require('../../../src/models');
// const { mockInsertinto, mockReturnInsert } = require('../../mocks/sales.mock');

chai.use(sinonChai);

const dataSales = [
  {
    saleId: 1,
    date: '2023-11-27T15:35:37.000Z',
    productId: 1,
    quantity: 5,
  },
  {
    saleId: 1,
    date: '2023-11-27T15:35:37.000Z',
    productId: 2,
    quantity: 10,
  },
  {
    saleId: 2,
    date: '2023-11-27T15:35:37.000Z',
    productId: 3,
    quantity: 15,
  },
];

describe('Realizando testes - PRODUCTS MODEL:', function () {
  it('Recuperando o sales com sucesso', async function () {
    sinon.stub(connection, 'execute').resolves([dataSales]);
    const responseSales = await salesModel.findAllSales();
    expect(responseSales).to.be.an('array');
    expect(responseSales).to.have.lengthOf(3);
    expect(responseSales).to.be.deep.equal(dataSales);
  });

  it('Recuperando o sales com id', async function () {
    sinon.stub(connection, 'execute').resolves([
      {
        date: '2023-11-27T16:10:55.000Z',
        productId: 1,
        quantity: 5,
      },
      {
        date: '2023-11-27T16:10:55.000Z',
        productId: 2,
        quantity: 10,
      },
    ]);
    const responseSale = await salesModel.findSalesById(1);
    expect(responseSale).to.be.an('object');
  });

  afterEach(function () {
    sinon.restore();
  });
});
