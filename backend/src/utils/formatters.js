const formatters = {
  formatCurrency(value, currency = 'USD') {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency,
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(value);
  },

  formatNumber(value, decimals = 2) {
    return new Intl.NumberFormat('en-US', {
      minimumFractionDigits: decimals,
      maximumFractionDigits: decimals,
    }).format(value);
  },

  formatPercentage(value, decimals = 2) {
    return `${value >= 0 ? '+' : ''}${value.toFixed(decimals)}%`;
  },

  formatAddress(address, chars = 4) {
    if (!address) return '';
    return `${address.slice(0, chars + 2)}...${address.slice(-chars)}`;
  },

  formatTimestamp(timestamp) {
    return new Date(timestamp).toISOString();
  },

  formatOrder(order) {
    return {
      id: order.id || order._id,
      symbol: order.symbol,
      side: order.side,
      type: order.type,
      quantity: parseFloat(order.quantity),
      price: order.price ? parseFloat(order.price) : null,
      status: order.status,
      createdAt: this.formatTimestamp(order.createdAt),
    };
  },

  formatTrade(trade) {
    return {
      id: trade.id || trade._id,
      symbol: trade.symbol,
      price: parseFloat(trade.price),
      quantity: parseFloat(trade.quantity),
      total: parseFloat(trade.price) * parseFloat(trade.quantity),
      buyer: trade.buyer,
      seller: trade.seller,
      txHash: trade.txHash,
      timestamp: this.formatTimestamp(trade.timestamp),
    };
  },
};

module.exports = { formatters };
