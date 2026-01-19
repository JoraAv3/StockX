const { complianceService } = require('./compliance.service');
const { tokenService } = require('./token.service');

const validationService = {
  async validateOrder(orderData) {
    const errors = [];

    // Validate symbol
    if (!orderData.symbol) {
      errors.push({ field: 'symbol', message: 'Symbol is required' });
    } else {
      const token = await tokenService.getTokenBySymbol(orderData.symbol);
      if (!token) {
        errors.push({ field: 'symbol', message: 'Token not found' });
      }
    }

    // Validate side
    if (!orderData.side || !['buy', 'sell'].includes(orderData.side)) {
      errors.push({ field: 'side', message: 'Valid side (buy/sell) is required' });
    }

    // Validate type
    if (!orderData.type || !['limit', 'market', 'stop'].includes(orderData.type)) {
      errors.push({ field: 'type', message: 'Valid order type is required' });
    }

    // Validate quantity
    if (!orderData.quantity || orderData.quantity <= 0) {
      errors.push({ field: 'quantity', message: 'Valid quantity is required' });
    }

    // Validate price for limit orders
    if (orderData.type === 'limit' && (!orderData.price || orderData.price <= 0)) {
      errors.push({ field: 'price', message: 'Price is required for limit orders' });
    }

    // Validate compliance
    if (orderData.userId) {
      const compliance = await complianceService.checkCompliance(orderData.userId);
      if (!compliance.approved) {
        errors.push({ field: 'compliance', message: 'User not compliant' });
      }
    }

    return {
      valid: errors.length === 0,
      errors,
    };
  },

  async validateTrade(tradeData) {
    const errors = [];

    if (!tradeData.symbol) errors.push({ field: 'symbol', message: 'Symbol required' });
    if (!tradeData.price || tradeData.price <= 0) errors.push({ field: 'price', message: 'Valid price required' });
    if (!tradeData.quantity || tradeData.quantity <= 0) errors.push({ field: 'quantity', message: 'Valid quantity required' });
    if (!tradeData.buyer) errors.push({ field: 'buyer', message: 'Buyer address required' });
    if (!tradeData.seller) errors.push({ field: 'seller', message: 'Seller address required' });

    return {
      valid: errors.length === 0,
      errors,
    };
  },
};

module.exports = { validationService };
