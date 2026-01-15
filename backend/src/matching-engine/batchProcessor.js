const { matchingEngine } = require('./matchingEngine');
const { tradeService } = require('../services/trade.service');
const { eventEmitter } = require('../events/eventEmitter');
const { config } = require('../config/config');

class BatchProcessor {
  constructor() {
    this.pendingOrders = [];
    this.isProcessing = false;
    this.intervalId = null;
  }

  start() {
    if (this.intervalId) return;

    this.intervalId = setInterval(() => {
      this.processBatch();
    }, config.matchingEngine.batchInterval);

    console.log('✅ Batch processor started');
  }

  stop() {
    if (this.intervalId) {
      clearInterval(this.intervalId);
      this.intervalId = null;
    }
  }

  addOrder(order) {
    this.pendingOrders.push(order);
  }

  async processBatch() {
    if (this.isProcessing || this.pendingOrders.length === 0) {
      return;
    }

    this.isProcessing = true;

    try {
      const orders = this.pendingOrders.splice(0, config.matchingEngine.batchSize);
      
      for (const order of orders) {
        const result = await matchingEngine.addOrder(order);

        if (result.matched && result.matches) {
          for (const match of result.matches) {
            // Create trade record
            const trade = await tradeService.createTrade({
              symbol: match.buyOrder.symbol,
              price: match.price,
              quantity: match.quantity,
              buyer: match.buyOrder.userId,
              seller: match.sellOrder.userId,
              txHash: `0x${Date.now().toString(16)}`,
            });

            // Emit event
            eventEmitter.emit('trade:executed', trade);
          }
        }
      }
    } catch (error) {
      console.error('Batch processing error:', error);
    } finally {
      this.isProcessing = false;
    }
  }
}

const batchProcessor = new BatchProcessor();

module.exports = { batchProcessor };
