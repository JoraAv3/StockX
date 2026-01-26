const { Router } = require('express');
const { createOrder, getOrders, cancelOrder, getOrderById } = require('../controllers/order.controller');
const { validateOrder } = require('../middleware/validation');
const { authenticate } = require('../middleware/auth');

const orderRouter = Router();

orderRouter.post('/', authenticate, validateOrder, createOrder);
orderRouter.get('/', authenticate, getOrders);
orderRouter.get('/:id', authenticate, getOrderById);
orderRouter.delete('/:id', authenticate, cancelOrder);

module.exports = { orderRouter };
