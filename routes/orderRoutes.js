const express = require('express');
const { createOrder, getOrderById, getMyOrders } = require('../controllers/orderController');
const { protect } = require('../Middleware/authMiddleware');
const router = express.Router();

router.post('/createOrder', protect, createOrder)
  router.get('/allOrders',protect, getMyOrders);

router.get('/:id',protect, getOrderById); 

module.exports = router;
