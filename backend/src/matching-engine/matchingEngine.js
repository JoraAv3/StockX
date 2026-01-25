// Order matching engine - Price-time priority matching
class OrderBook {
  constructor(symbol) {
    this.symbol = symbol;
    this.buyOrders = []; // Sorted by price (highest first), then time
    this.sellOrders = []; // Sorted by price (lowest first), then time
  }

  addOrder(order) {
    const matches = [];
    
    if (order.side === 'buy') {
      matches.push(...this.matchBuyOrder(order));
      if (order.quantity > 0) {
        this.insertBuyOrder(order);
      }
    } else {
      matches.push(...this.matchSellOrder(order));
      if (order.quantity > 0) {
        this.insertSellOrder(order);
      }
    }

    return matches;
  }

  matchBuyOrder(buyOrder) {
    const matches = [];
    let remainingQuantity = buyOrder.quantity;

    while (remainingQuantity > 0 && this.sellOrders.length > 0) {
      const sellOrder = this.sellOrders[0];
      
      if (sellOrder.price > buyOrder.price && buyOrder.type === 'limit') {
        break; // No more matches possible
      }

      const matchQuantity = Math.min(remainingQuantity, sellOrder.quantity);
      const matchPrice = sellOrder.price; // Price-time priority

      matches.push({
        buyOrder,
        sellOrder,
        price: matchPrice,
        quantity: matchQuantity,
      });

      remainingQuantity -= matchQuantity;
      sellOrder.quantity -= matchQuantity;

      if (sellOrder.quantity === 0) {
        this.sellOrders.shift();
      }

      buyOrder.quantity = remainingQuantity;
    }

    return matches;
  }

  matchSellOrder(sellOrder) {
    const matches = [];
    let remainingQuantity = sellOrder.quantity;

    while (remainingQuantity > 0 && this.buyOrders.length > 0) {
      const buyOrder = this.buyOrders[0];
      
      if (buyOrder.price < sellOrder.price && sellOrder.type === 'limit') {
        break; // No more matches possible
      }

      const matchQuantity = Math.min(remainingQuantity, buyOrder.quantity);
      const matchPrice = buyOrder.price; // Price-time priority

      matches.push({
        buyOrder,
        sellOrder,
        price: matchPrice,
        quantity: matchQuantity,
      });

      remainingQuantity -= matchQuantity;
      buyOrder.quantity -= matchQuantity;

      if (buyOrder.quantity === 0) {
        this.buyOrders.shift();
      }

      sellOrder.quantity = remainingQuantity;
    }

    return matches;
  }

  insertBuyOrder(order) {
    // Insert sorted by price (desc), then time (asc)
    let insertIndex = this.buyOrders.length;
    for (let i = 0; i < this.buyOrders.length; i++) {
      if (order.price > this.buyOrders[i].price) {
        insertIndex = i;
        break;
      }
    }
    this.buyOrders.splice(insertIndex, 0, order);
  }

  insertSellOrder(order) {
    // Insert sorted by price (asc), then time (asc)
    let insertIndex = this.sellOrders.length;
    for (let i = 0; i < this.sellOrders.length; i++) {
      if (order.price < this.sellOrders[i].price) {
        insertIndex = i;
        break;
      }
    }
    this.sellOrders.splice(insertIndex, 0, order);
  }

  getBestBidAsk() {
    const bestBid = this.buyOrders.length > 0 ? this.buyOrders[0] : null;
    const bestAsk = this.sellOrders.length > 0 ? this.sellOrders[0] : null;
    return {
      bid: bestBid ? { price: bestBid.price, quantity: bestBid.quantity } : null,
      ask: bestAsk ? { price: bestAsk.price, quantity: bestAsk.quantity } : null,
      spread: bestBid && bestAsk ? bestAsk.price - bestBid.price : null,
    };
  }

  getOrderBook(limit = 20) {
    return {
      bids: this.buyOrders.slice(0, limit).map(o => ({
        price: o.price,
        quantity: o.quantity,
      })),
      asks: this.sellOrders.slice(0, limit).map(o => ({
        price: o.price,
        quantity: o.quantity,
      })),
    };
  }

  removeOrder(orderId) {
    this.buyOrders = this.buyOrders.filter(o => o.id !== orderId);
    this.sellOrders = this.sellOrders.filter(o => o.id !== orderId);
    return true;
  }
}

class MatchingEngine {
  constructor() {
    this.orderBooks = new Map(); // symbol -> OrderBook
  }

  getOrderBook(symbol) {
    if (!this.orderBooks.has(symbol)) {
      this.orderBooks.set(symbol, new OrderBook(symbol));
    }
    return this.orderBooks.get(symbol);
  }

  async addOrder(order) {
    const orderBook = this.getOrderBook(order.symbol);
    const matches = orderBook.addOrder(order);

    if (matches.length > 0) {
      // Process matches
      for (const match of matches) {
        // Create trade records
        // Emit events
      }

      return {
        matched: true,
        matches,
        buyOrder: order.side === 'buy' ? order : matches[0]?.buyOrder,
        sellOrder: order.side === 'sell' ? order : matches[0]?.sellOrder,
      };
    }

    return {
      matched: false,
      order,
    };
  }

  removeOrder(orderId) {
    for (const orderBook of this.orderBooks.values()) {
      orderBook.removeOrder(orderId);
    }
    return true;
  }

  getBestBidAsk(symbol) {
    const orderBook = this.getOrderBook(symbol);
    return orderBook.getBestBidAsk();
  }

  getOrderBook(symbol, limit = 20) {
    const orderBook = this.getOrderBook(symbol);
    return orderBook.getOrderBook(limit);
  }
}

const matchingEngine = new MatchingEngine();

const initializeMatchingEngine = () => {
  console.log('✅ Matching engine initialized');
  return matchingEngine;
};

module.exports = { matchingEngine, initializeMatchingEngine };
