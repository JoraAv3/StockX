const { EventEmitter } = require('events');

class StockXEventEmitter extends EventEmitter {
  constructor() {
    super();
    this.setMaxListeners(100); // Allow many listeners
  }

  emitOrderCreated(order) {
    this.emit('order:created', order);
  }

  emitOrderCancelled(order) {
    this.emit('order:cancelled', order);
  }

  emitTradeExecuted(trade) {
    this.emit('trade:executed', trade);
  }

  emitComplianceUpdated(userId, status) {
    this.emit('compliance:updated', { userId, status });
  }
}

const eventEmitter = new StockXEventEmitter();

// Add logging for debugging
if (process.env.NODE_ENV === 'development') {
  eventEmitter.on('order:created', (order) => {
    console.log('📝 Order created:', order.id);
  });

  eventEmitter.on('order:cancelled', (order) => {
    console.log('❌ Order cancelled:', order.id);
  });

  eventEmitter.on('trade:executed', (trade) => {
    console.log('✅ Trade executed:', trade.id, trade.symbol, trade.price);
  });
}

module.exports = { eventEmitter };
