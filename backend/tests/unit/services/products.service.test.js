const { expect } = require('chai');
const sinon = require('sinon');
const { productsModel } = require('../../../src/models');
const { productsSevice } = require('../../../src/services');
// const { productFromDB, productsFromDB } = require('../../mocks/products.mock');

describe('Não recupera o product com id inexistente', function () {
  it('Realizando testes - PRODUCTS SERVICE', async function () {
    sinon.stub(productsModel, 'findById').resolves(undefined);
    const responseService = await productsSevice.findById(9999999);
      
    expect(responseService.status).to.be.equal('NOT_FOUND');
    expect(responseService.data.message).to.be.a('string');
    expect(responseService.data.message).to.be.equal('Product not found');
  });
});