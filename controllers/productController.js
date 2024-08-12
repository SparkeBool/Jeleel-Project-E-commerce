const Product = require('../models/productModel');

exports.getProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
    
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }
    res.json(product);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.createProduct = async (req, res) => {
  const { name, description, price, category, stock } = req.body;

      if(!name || !description || !price || !stock || !category){
          console.log('fill all fields');
        return res.status(400).json({message:'All field are compulsory'});

      }
  try {
    const product = new Product({ name, description, price, category, stock });
    await product.save();
    res.status(201).json({message: "Product Created!"});
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.updateProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }
    res.json(product);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.deleteProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);
    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }
    res.json({ message: 'Product removed' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
