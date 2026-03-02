import React from 'react';
import { TrendingUp, TrendingDown } from 'lucide-react';

const TopPerformers: React.FC = () => {
  const performers = [
    { symbol: 'TSLA', name: 'Tesla', change: 12.5, price: 245.20 },
    { symbol: 'NVDA', name: 'NVIDIA', change: 8.3, price: 485.50 },
    { symbol: 'AMD', name: 'AMD', change: 6.7, price: 142.30 },
    { symbol: 'META', name: 'Meta', change: 5.2, price: 320.80 },
    { symbol: 'NFLX', name: 'Netflix', change: -2.1, price: 425.60 },
  ];

  return (
    <div className="card">
      <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
        Top Performers
      </h2>
      <div className="space-y-3">
        {performers.map((stock) => (
          <div
            key={stock.symbol}
            className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
          >
            <div>
              <p className="font-medium text-gray-900 dark:text-white">{stock.symbol}</p>
              <p className="text-xs text-gray-600 dark:text-gray-400">{stock.name}</p>
            </div>
            <div className="text-right">
              <p className="font-medium text-gray-900 dark:text-white">${stock.price.toFixed(2)}</p>
              <div className="flex items-center justify-end space-x-1 mt-1">
                {stock.change >= 0 ? (
                  <>
                    <TrendingUp className="w-3 h-3 text-success-500" />
                    <span className="text-sm text-success-600 dark:text-success-400">
                      +{stock.change}%
                    </span>
                  </>
                ) : (
                  <>
                    <TrendingDown className="w-3 h-3 text-danger-500" />
                    <span className="text-sm text-danger-600 dark:text-danger-400">
                      {stock.change}%
                    </span>
                  </>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TopPerformers;
