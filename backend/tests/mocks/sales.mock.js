const salesData = [
  {
    productId: 1,
    quantity: 1,
  },
  {
    productId: 2,
    quantity: 5,
  },
];

const mockInsertinto = [
  {
    productId: 1,
    quantity: 1,
  },
  {
    productId: 2,
    quantity: 5,
  },
];

const mockReturnInsert = {
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
};

const salesResult = {
  status: 'CREATED',
  data: salesData,
};

module.exports = {
  salesData,
  salesResult,
  mockInsertinto,
  mockReturnInsert,
};