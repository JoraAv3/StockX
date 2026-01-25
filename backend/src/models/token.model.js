// Token model
const tokenModel = {
  async find(query) {
    // Mock tokens
    const mockTokens = [
      { _id: '1', symbol: 'AAPL', name: 'Apple Inc.', address: '0x...', price: 175.50, marketCap: 2800000000000 },
      { _id: '2', symbol: 'MSFT', name: 'Microsoft Corp.', address: '0x...', price: 380.75, marketCap: 2850000000000 },
      { _id: '3', symbol: 'TSLA', name: 'Tesla Inc.', address: '0x...', price: 245.20, marketCap: 780000000000 },
    ];

    if (query.$or) {
      return mockTokens.filter(token => 
        query.$or.some(condition => {
          if (condition.symbol) {
            return token.symbol.match(condition.symbol.$regex);
          }
          return false;
        })
      );
    }

    return mockTokens.slice(query.skip || 0, (query.skip || 0) + (query.limit || 100));
  },

  async countDocuments() {
    return 247; // Mock count
  },

  async findOne(query) {
    const tokens = await this.find({});
    return tokens.find(t => 
      (query.symbol && t.symbol === query.symbol) ||
      (query.address && t.address === query.address)
    ) || null;
  },

  async create(tokenData) {
    return {
      ...tokenData,
      _id: `token_${Date.now()}`,
      createdAt: new Date(),
    };
  },

  async findOneAndUpdate(query, update, options) {
    const token = await this.findOne(query);
    return token ? { ...token, ...update } : null;
  },
};

module.exports = { tokenModel };
