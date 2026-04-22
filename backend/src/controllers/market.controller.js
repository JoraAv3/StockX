const { marketService } = require('../services/market.service');
const { tokenService } = require('../services/token.service');

const getMarketData = async (req, res, next) => {
  try {
    const marketData = await marketService.getMarketData();
    res.json({ marketData });
  } catch (error) {
    next(error);
  }
};

const getMarketSummary = async (req, res, next) => {
  try {
    const [tokensListed, marketData] = await Promise.all([
      tokenService.countTokens(),
      marketService.getMarketData(),
    ]);

    res.json({
      tokensListed,
      totalTrades: marketData.totalTrades,
      totalVolume: marketData.totalVolume,
      generatedAt: new Date().toISOString(),
    });
  } catch (error) {
    next(error);
  }
};

const getTokens = async (req, res, next) => {
  try {
    const filters = {
      limit: parseInt(req.query.limit) || 100,
      offset: parseInt(req.query.offset) || 0,
      search: req.query.search,
    };

    const tokens = await tokenService.getTokens(filters);
    const total = await tokenService.countTokens();

    res.json({ 
      tokens: tokens.map(token => tokenService.formatToken(token)),
      total,
      limit: filters.limit,
      offset: filters.offset
    });
  } catch (error) {
    next(error);
  }
};

const getTokenBySymbol = async (req, res, next) => {
  try {
    const token = await tokenService.getTokenBySymbol(req.params.symbol);
    
    if (!token) {
      return res.status(404).json({ error: 'Token not found' });
    }

    const priceHistory = await marketService.getPriceHistory(req.params.symbol, '24h');

    res.json({ 
      token: tokenService.formatToken(token),
      priceHistory
    });
  } catch (error) {
    next(error);
  }
};

const getPriceHistory = async (req, res, next) => {
  try {
    const { symbol } = req.params;
    const period = req.query.period || '24h';

    const priceHistory = await marketService.getPriceHistory(symbol, period);

    res.json({ 
      symbol,
      period,
      history: priceHistory
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getMarketData,
  getMarketSummary,
  getTokens,
  getTokenBySymbol,
  getPriceHistory,
};
