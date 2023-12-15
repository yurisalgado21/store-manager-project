const chai = require('chai');
const sinon = require('sinon');

const { expect } = chai;
const sinonChai = require('sinon-chai');
const { productsModel } = require('../../../src/models');
const { productsSevice } = require('../../../src/services');
const { productsReturns } = require('../../mocks/products.mock');

chai.use(sinonChai);

describe('Realizando testes - PRODUCTS SERVICE', function () {
  it('Não recupera o product com id inexistente', async function () {
    sinon.stub(productsModel, 'findById').resolves(undefined);
    const responseService = await productsSevice.findById(9999999);
      
    expect(responseService.status).to.be.equal('NOT_FOUND');
    expect(responseService.data.message).to.be.a('string');
    expect(responseService.data.message).to.be.equal('Product not found');
  });
  it('Recuperando o product com id corretamente', async function () {
    sinon.stub(productsModel, 'findById').resolves({
      id: 1,
      name: 'Martelo de Thor',
    });
    const responseService = await productsSevice.findById(1);
    expect(responseService.status).to.be.equal('SUCCESSFUL');
    expect(responseService.data).to.be.deep.equal({
      id: 1,
      name: 'Martelo de Thor',
    });
  });
  it('Recuperando todos os products', async function () {
    sinon.stub(productsModel, 'findAllProducts').resolves(productsReturns);
    const responseService = await productsSevice.findAllProducts();
    expect(responseService.status).to.equal('SUCCESSFUL');
    expect(responseService.data).to.deep.equal(productsReturns);
  });

  it('Inserindo um nome do products corretamente', async function () {
    sinon.stub(productsModel, 'insert').resolves(4);
    sinon.stub(productsModel, 'findById').resolves({
      id: 4,
      name: 'ProdutoX',
    });
    const responseService = await productsSevice.requestProduct('ProdutoX');
    expect(responseService.status).to.equal('CREATED');
    expect(responseService.data).to.deep.equal({
      id: 4,
      name: 'ProdutoX',
    });
  });

  it('Atualizando o product corretamente', async function () {
    sinon.stub(productsModel, 'update').resolves();
    sinon.stub(productsModel, 'findById').resolves({
      id: 1,
      name: 'Martelo do Batma',
    });
    const responseService = await productsSevice.updateProducts(1, 'Martelo do Batma');
    expect(responseService.status).to.equal('SUCCESSFUL');
    expect(responseService.data).to.deep.equal({
      id: 1,
      name: 'Martelo do Batma',
    });
  });

  afterEach(function () {
    sinon.restore();
  });
});