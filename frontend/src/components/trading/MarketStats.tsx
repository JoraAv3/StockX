import React from 'react';
import { TrendingUp, TrendingDown, DollarSign, BarChart3 } from 'lucide-react';

interface MarketStatsProps {
  symbol: string;
}

const MarketStats: React.FC<MarketStatsProps> = ({ symbol }) => {
  const stats = [
    { label: 'Market Cap', value: '$2.8T', change: '+2.34%', trend: 'up' },
    { label: '24h Volume', value: '$12.4B', change: '+8.2%', trend: 'up' },
    { label: 'Circulating Supply', value: '15.7B', change: '0%', trend: 'neutral' },
    { label: 'Total Supply', value: '15.7B', change: '0%', trend: 'neutral' },
  ];

  return (
    <div className="grid grid-cols-2 gap-4">
      {stats.map((stat) => (
        <div key={stat.label} className="card">
          <div className="flex items-center justify-between mb-2">
            <p className="text-xs text-gray-600 dark:text-gray-400">{stat.label}</p>
            {stat.trend === 'up' && <TrendingUp className="w-4 h-4 text-success-500" />}
            {stat.trend === 'down' && <TrendingDown className="w-4 h-4 text-danger-500" />}
          </div>
          <p className="text-lg font-bold text-gray-900 dark:text-white">{stat.value}</p>
          {stat.change !== '0%' && (
            <p
              className={`text-xs mt-1 ${
                stat.trend === 'up'
                  ? 'text-success-600 dark:text-success-400'
                  : 'text-danger-600 dark:text-danger-400'
              }`}
            >
              {stat.change}
            </p>
          )}
        </div>
      ))}
    </div>
  );
};

export default MarketStats;
