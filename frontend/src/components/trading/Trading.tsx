import React, { useState } from 'react';
import { motion } from 'framer-motion';
import OrderBook from './OrderBook';
import OrderForm from './OrderForm';
import TradeHistory from './TradeHistory';
import PriceChart from './PriceChart';
import MarketStats from './MarketStats';
import ScrollAnimation from '../common/ScrollAnimation';
import TradingGuides from './TradingGuides';
import TradingFeatures from './TradingFeatures';

const Trading: React.FC = () => {
  const [selectedSymbol, setSelectedSymbol] = useState<string>('AAPL');

  const symbols = [
    { symbol: 'AAPL', name: 'Apple Inc.', price: 175.50, change: 2.34 },
    { symbol: 'MSFT', name: 'Microsoft Corp.', price: 380.75, change: -1.23 },
    { symbol: 'TSLA', name: 'Tesla Inc.', price: 245.20, change: 5.67 },
    { symbol: 'GOOGL', name: 'Alphabet Inc.', price: 140.30, change: 0.89 },
    { symbol: 'AMZN', name: 'Amazon.com Inc.', price: 145.80, change: -2.10 },
  ];

  return (
    <div className="space-y-12">
      {/* Header Section */}
      <ScrollAnimation>
        <div>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4"
          >
            Trading Platform
          </motion.h1>
          <p className="text-xl text-gray-600 dark:text-gray-400">
            Trade tokenized equities with instant settlement and advanced order types
          </p>
        </div>
      </ScrollAnimation>

      {/* Symbol Selector */}
      <ScrollAnimation delay={0.1}>
        <motion.div
          className="card"
          whileHover={{ scale: 1.01 }}
        >
          <div className="flex flex-wrap gap-2">
            {symbols.map((stock, index) => (
              <motion.button
                key={stock.symbol}
                onClick={() => setSelectedSymbol(stock.symbol)}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.05 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
                  selectedSymbol === stock.symbol
                    ? 'bg-primary-600 text-white shadow-lg'
                    : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
                }`}
              >
                <div className="flex items-center space-x-2">
                  <span>{stock.symbol}</span>
                  <span
                    className={`text-xs ${
                      stock.change >= 0
                        ? 'text-success-500'
                        : 'text-danger-500'
                    }`}
                  >
                    {stock.change >= 0 ? '+' : ''}{stock.change}%
                  </span>
                </div>
              </motion.button>
            ))}
          </div>
        </motion.div>
      </ScrollAnimation>

      {/* Main Trading Interface */}
      <ScrollAnimation delay={0.2}>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
            >
              <PriceChart symbol={selectedSymbol} />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
            >
              <MarketStats symbol={selectedSymbol} />
            </motion.div>
          </div>

          <div className="space-y-6">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
            >
              <OrderForm symbol={selectedSymbol} />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
            >
              <OrderBook symbol={selectedSymbol} />
            </motion.div>
          </div>
        </div>
      </ScrollAnimation>

      {/* Trade History */}
      <ScrollAnimation delay={0.5}>
        <TradeHistory symbol={selectedSymbol} />
      </ScrollAnimation>

      {/* Trading Features */}
      <ScrollAnimation delay={0.6}>
        <TradingFeatures />
      </ScrollAnimation>

      {/* Trading Guides */}
      <ScrollAnimation delay={0.7}>
        <TradingGuides />
      </ScrollAnimation>
    </div>
  );
};

export default Trading;
