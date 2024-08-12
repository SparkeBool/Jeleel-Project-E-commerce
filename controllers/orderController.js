const Order = require('../models/orderModel');

exports.createOrder = async (req, res) => {
  const { orderItems, totalPrice } = req.body;
  try {
    const order = new Order({
      user: req.user.id,
      orderItems,
      totalPrice,
    });
    await order.save();
    res.status(201).json(order);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.getOrderById = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id).populate('orderItems.product');
    if (!order) {
      return res.status(404).json({ error: 'Order not found' });
    }
    res.json(order);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getMyOrders = async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user.id }).populate('orderItems.product');
    res.json(orders);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
