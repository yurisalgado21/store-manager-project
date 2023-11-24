// const validateSales = (req, res, next) => {
//   const salesArray = req.body;
//   for (let index = 0; index < salesArray.length; index += 1) {
//     const { productId, quantity } = salesArray[index];
//     if (!productId) {
//       return res
//         .status(400).json({ message: '"productId" is required' }); 
//     }
//     if (quantity < 1) {
//       return res.status(422).json({ message: '"quantity" must be greater than or equal to 1' });
//     }
//     if (!quantity) {
//       return res
//         .status(400).json({ message: '"quantity" is required' }); 
//     }
//     if (productId > 3) {
//       return res.status(404).json({ message: 'Product not found' });
//     }
//   }
//   next();
// };

const validateProductsAndSales = (productId, quantity) => {
  const n1 = 400;
  const n2 = 422;
  const n3 = 404;
  if (!productId) {
    return [n1, { message: '"productId" is required' }]; 
  }
  if (quantity < 1) {
    return [n2, { message: '"quantity" must be greater than or equal to 1' }];
  }
  if (!quantity) {
    return [n1, { message: '"quantity" is required' }]; 
  }
  if (productId > 3) {
    return [n3, { message: 'Product not found' }];
  }
  return null;
};

const validateSales = (req, res, next) => {
  const salesArray = req.body;
  for (let index = 0; index < salesArray.length; index += 1) {
    const { productId, quantity } = salesArray[index];
    const result = validateProductsAndSales(productId, quantity);
    if (result) {
      return res.status(result[0]).json(result[1]);
    }
  }
  next();
};

module.exports = {
  validateSales,
};