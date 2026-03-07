const { Router } = require('express');
const { getMarketData, getTokens, getTokenBySymbol, getPriceHistory } = require('../controllers/market.controller');

const marketRouter = Router();

marketRouter.get('/data', getMarketData);
marketRouter.get('/tokens', getTokens);
marketRouter.get('/tokens/:symbol', getTokenBySymbol);
marketRouter.get('/history/:symbol', getPriceHistory);

module.exports = { marketRouter };
