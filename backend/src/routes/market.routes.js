const { Router } = require('express');
const { getMarketData, getMarketSummary, getTokens, getTokenBySymbol, getPriceHistory } = require('../controllers/market.controller');

const marketRouter = Router();

marketRouter.get('/data', getMarketData);
marketRouter.get('/summary', getMarketSummary);
marketRouter.get('/tokens', getTokens);
marketRouter.get('/tokens/:symbol', getTokenBySymbol);
marketRouter.get('/history/:symbol', getPriceHistory);

module.exports = { marketRouter };
