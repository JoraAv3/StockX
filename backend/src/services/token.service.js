const { tokenModel } = require('../models/token.model');

const tokenService = {
  async getTokens(filters = {}) {
    const query = {};
    
    if (filters.search) {
      query.$or = [
        { symbol: { $regex: filters.search, $options: 'i' } },
        { name: { $regex: filters.search, $options: 'i' } },
      ];
    }

    return await tokenModel.find(query)
      .limit(filters.limit || 100)
      .skip(filters.offset || 0)
      .sort({ marketCap: -1 });
  },

  async countTokens() {
    return await tokenModel.countDocuments();
  },

  async getTokenBySymbol(symbol) {
    return await tokenModel.findOne({ symbol: symbol.toUpperCase() });
  },

  async getTokenByAddress(address) {
    return await tokenModel.findOne({ address: address.toLowerCase() });
  },

  async createToken(tokenData) {
    return await tokenModel.create(tokenData);
  },

  async updateToken(symbol, updates) {
    return await tokenModel.findOneAndUpdate(
      { symbol: symbol.toUpperCase() },
      { ...updates, updatedAt: new Date() },
      { new: true }
    );
  },

  formatToken(token) {
    if (!token) return null;

    return {
      id: token._id || token.id,
      symbol: token.symbol,
      name: token.name,
      address: token.address,
      price: token.price,
      change24h: token.change24h,
      volume24h: token.volume24h,
      marketCap: token.marketCap,
      totalSupply: token.totalSupply,
    };
  },
};

module.exports = { tokenService };
