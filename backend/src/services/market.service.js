const { priceCache } = require('../utils/cache');
const { oracleService } = require('./oracle.service');

const marketService = {
  async getMarketData() {
    // In production, this would fetch from database or cache
    const mockData = {
      totalVolume: '12400000',
      totalTrades: 5432,
      activeTokens: 247,
      averagePrice: 175.50,
      lastUpdated: new Date().toISOString(),
    };

    return mockData;
  },

  async getPriceHistory(symbol, period = '24h') {
    const cacheKey = `price_history_${symbol}_${period}`;
    
    // Try cache first
    const cached = await priceCache.get(cacheKey);
    if (cached) return cached;

    // Fetch from oracle
    const history = await oracleService.getPriceHistory(symbol, period);

    // Cache for 1 minute
    await priceCache.set(cacheKey, history, 60);

    return history;
  },

  async getCurrentPrice(symbol) {
    return await oracleService.getCurrentPrice(symbol);
  },

  async getMarketStats(symbol) {
    const price = await this.getCurrentPrice(symbol);
    const history = await this.getPriceHistory(symbol, '24h');

    const prices = history.map(h => h.price);
    const high = Math.max(...prices);
    const low = Math.min(...prices);
    const volume = history.reduce((sum, h) => sum + (h.volume || 0), 0);
    const change = history.length > 0 
      ? ((prices[prices.length - 1] - prices[0]) / prices[0]) * 100 
      : 0;

    return {
      symbol,
      price,
      high,
      low,
      volume,
      change,
      changePercent: change.toFixed(2) + '%',
    };
  },
};

module.exports = { marketService };
