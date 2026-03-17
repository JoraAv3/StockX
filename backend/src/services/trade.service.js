const { tradeModel } = require('../models/trade.model');
const { eventEmitter } = require('../events/eventEmitter');

const tradeService = {
  async createTrade(tradeData) {
    const trade = await tradeModel.create({
      ...tradeData,
      timestamp: new Date(),
    });

    // Emit event
    eventEmitter.emit('trade:executed', trade);

    return trade;
  },

  async getTradeById(tradeId) {
    return await tradeModel.findById(tradeId);
  },

  async getTrades(filters = {}) {
    const query = {};
    
    if (filters.symbol) query.symbol = filters.symbol;
    if (filters.startTime || filters.endTime) {
      query.timestamp = {};
      if (filters.startTime) query.timestamp.$gte = new Date(filters.startTime);
      if (filters.endTime) query.timestamp.$lte = new Date(filters.endTime);
    }

    return await tradeModel.find(query)
      .limit(filters.limit || 100)
      .skip(filters.offset || 0)
      .sort({ timestamp: -1 });
  },

  async countTrades(filters = {}) {
    const query = {};
    
    if (filters.symbol) query.symbol = filters.symbol;

    return await tradeModel.countDocuments(query);
  },

  async getUserTrades(filters) {
    const query = { $or: [
      { buyer: filters.userId },
      { seller: filters.userId }
    ]};
    
    if (filters.symbol) query.symbol = filters.symbol;

    return await tradeModel.find(query)
      .limit(filters.limit || 50)
      .skip(filters.offset || 0)
      .sort({ timestamp: -1 });
  },

  formatTrade(trade) {
    if (!trade) return null;

    return {
      id: trade._id || trade.id,
      symbol: trade.symbol,
      price: trade.price,
      quantity: trade.quantity,
      buyer: trade.buyer,
      seller: trade.seller,
      txHash: trade.txHash,
      timestamp: trade.timestamp,
    };
  },
};

module.exports = { tradeService };
