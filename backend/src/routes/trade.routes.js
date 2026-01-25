const { Router } = require('express');
const { getTrades, getTradeById, getUserTrades } = require('../controllers/trade.controller');
const { authenticate } = require('../middleware/auth');

const tradeRouter = Router();

tradeRouter.get('/', getTrades);
tradeRouter.get('/user/:userId', authenticate, getUserTrades);
tradeRouter.get('/:id', getTradeById);

module.exports = { tradeRouter };
