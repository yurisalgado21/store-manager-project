const chai = require('chai');

const { expect } = chai;
const sinon = require('sinon');
const salesService = require('../../../src/services/sales.service');
const salesModels = require('../../../src/models/sales.model');

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
});