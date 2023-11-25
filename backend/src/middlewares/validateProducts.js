const validateProduct = (req, res, next) => {
  const { name } = req.body;
  if (!name) return res.status(400).json({ message: '"name" is required' });
  if (name.length < 5) {
    return res.status(422).json({ message: '"name" length must be at least 5 characters long' });
  }
  next();
};

const validateUpdateProduct = (req, res, next) => {
  const { id } = req.params;
  const { name } = req.body;
  if (!name) return res.status(400).json({ message: '"name" is required' });
  if (name.length < 5) {
    return res
      .status(422).json({ message: '"name" length must be at least 5 characters long' }); 
  }
  if (id > 3) return res.status(404).json({ message: 'Product not found' });
  next();
};

module.exports = {
  validateProduct,
  validateUpdateProduct,
};