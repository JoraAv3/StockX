import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { BarChart3, TrendingUp, PieChart, Activity } from 'lucide-react';
import PerformanceChart from './PerformanceChart';
import VolumeAnalysis from './VolumeAnalysis';
import TopPerformers from './TopPerformers';
import RiskMetrics from './RiskMetrics';
import SectorDistribution from './SectorDistribution';
import CorrelationMatrix from './CorrelationMatrix';

const Analytics: React.FC = () => {
  const [timeRange, setTimeRange] = useState<'1D' | '7D' | '30D' | '1Y' | 'ALL'>('30D');

  const timeRanges = ['1D', '7D', '30D', '1Y', 'ALL'];

  const overviewStats = [
    { label: 'Total Market Cap', value: '$48.5T', change: '+2.34%', trend: 'up' as const, icon: BarChart3 },
    { label: 'Active Tokens', value: '247', change: '+5', trend: 'up' as const, icon: Activity },
    { label: '24h Volume', value: '$12.4B', change: '+8.2%', trend: 'up' as const, icon: TrendingUp },
    { label: 'Avg. P/E Ratio', value: '28.5', change: '-0.5', trend: 'down' as const, icon: PieChart },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            Analytics
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Advanced market analytics and insights
          </p>
        </div>
        <div className="flex space-x-2">
          {timeRanges.map((range) => (
            <button
              key={range}
              onClick={() => setTimeRange(range as any)}
              className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
                timeRange === range
                  ? 'bg-primary-600 text-white'
                  : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
              }`}
            >
              {range}
            </button>
          ))}
        </div>
      </div>

      {/* Overview Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {overviewStats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="card"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">
                    {stat.label}
                  </p>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">
                    {stat.value}
                  </p>
                  <p
                    className={`text-sm font-medium mt-2 ${
                      stat.trend === 'up'
                        ? 'text-success-600 dark:text-success-400'
                        : 'text-danger-600 dark:text-danger-400'
                    }`}
                  >
                    {stat.change}
                  </p>
                </div>
                <div className="p-3 bg-primary-100 dark:bg-primary-900/30 rounded-lg">
                  <Icon className="w-6 h-6 text-primary-600 dark:text-primary-400" />
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Charts Row 1 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <PerformanceChart timeRange={timeRange} />
        <VolumeAnalysis timeRange={timeRange} />
      </div>

      {/* Charts Row 2 */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <TopPerformers />
        <SectorDistribution />
        <RiskMetrics />
      </div>

      {/* Correlation Matrix */}
      <CorrelationMatrix />
    </div>
  );
};

export default Analytics;
