const express = require('express');
const {getProducts, getProductById, createProduct, updateProduct, deleteProduct,} = require('../controllers/productController');
const { protect } = require('../Middleware/authMiddleware');

const router = express.Router();

router.get('/allProducts',getProducts);
router.post('/create-product', protect, createProduct); 

router.get('/product/:id',getProductById);
router.put('/product/update/:id',protect, updateProduct)
router.delete('/product/delete/:id',protect, deleteProduct);
 
module.exports = router;
