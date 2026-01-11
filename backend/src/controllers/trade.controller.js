const { tradeService } = require('../services/trade.service');

const getTrades = async (req, res, next) => {
  try {
    const filters = {
      symbol: req.query.symbol,
      limit: parseInt(req.query.limit) || 100,
      offset: parseInt(req.query.offset) || 0,
      startTime: req.query.startTime,
      endTime: req.query.endTime,
    };

    const trades = await tradeService.getTrades(filters);
    const total = await tradeService.countTrades(filters);

    res.json({ 
      trades: trades.map(trade => tradeService.formatTrade(trade)),
      total,
      limit: filters.limit,
      offset: filters.offset
    });
  } catch (error) {
    next(error);
  }
};

const getTradeById = async (req, res, next) => {
  try {
    const trade = await tradeService.getTradeById(req.params.id);
    
    if (!trade) {
      return res.status(404).json({ error: 'Trade not found' });
    }

    res.json({ trade: tradeService.formatTrade(trade) });
  } catch (error) {
    next(error);
  }
};

const getUserTrades = async (req, res, next) => {
  try {
    const userId = req.params.userId || req.user?.id;
    
    if (!userId) {
      return res.status(400).json({ error: 'User ID required' });
    }

    const filters = {
      userId,
      symbol: req.query.symbol,
      limit: parseInt(req.query.limit) || 50,
      offset: parseInt(req.query.offset) || 0,
    };

    const trades = await tradeService.getUserTrades(filters);

    res.json({ 
      trades: trades.map(trade => tradeService.formatTrade(trade))
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getTrades,
  getTradeById,
  getUserTrades,
};
