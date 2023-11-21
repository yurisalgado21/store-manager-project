const { expect } = require('chai');
const sinon = require('sinon');
const connection = require('../../../src/db/connection');
const { productsModel } = require('../../../src/models');
const {
  productFromDB,
  productsFromDB,
} = require('../../mocks/products.mock');

describe('Realizando testes - PRODUCTS MODEL:', function () {
  it('Recuperando o product por id com sucesso', async function () {
    sinon.stub(connection, 'execute').resolves([[productFromDB]]);
    const inputData = 1;
    const product = await productsModel.findById(inputData);

    expect(product).to.be.an('object');
    expect(product).to.be.deep.equal(productFromDB);
  });

  it('Recuperando os products com sucesso', async function () {
    sinon.stub(connection, 'execute').resolves([productsFromDB]);
    const products = await productsModel.findAllProducts();

    expect(products).to.be.an('array');
    expect(products).to.have.lengthOf(2);
    expect(products).to.be.deep.equal(productsFromDB);
  });

  afterEach(function () {
    sinon.restore();
  });
});