import React from 'react';
import { ArrowUpRight, ArrowDownRight } from 'lucide-react';

interface TradeHistoryProps {
  symbol: string;
}

const TradeHistory: React.FC<TradeHistoryProps> = ({ symbol }) => {
  const trades = [
    { id: '1', type: 'buy' as const, price: 175.50, quantity: 10, time: '2 min ago', txHash: '0x1234...5678' },
    { id: '2', type: 'sell' as const, price: 175.45, quantity: 5, time: '5 min ago', txHash: '0xabcd...efgh' },
    { id: '3', type: 'buy' as const, price: 175.40, quantity: 15, time: '8 min ago', txHash: '0x9876...5432' },
    { id: '4', type: 'sell' as const, price: 175.55, quantity: 8, time: '12 min ago', txHash: '0x5678...9012' },
    { id: '5', type: 'buy' as const, price: 175.35, quantity: 20, time: '15 min ago', txHash: '0x3456...7890' },
    { id: '6', type: 'buy' as const, price: 175.30, quantity: 12, time: '18 min ago', txHash: '0x2468...1357' },
    { id: '7', type: 'sell' as const, price: 175.60, quantity: 7, time: '22 min ago', txHash: '0x1357...2468' },
    { id: '8', type: 'buy' as const, price: 175.25, quantity: 25, time: '25 min ago', txHash: '0x7890...3456' },
  ];

  return (
    <div className="card">
      <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
        Recent Trades - {symbol}
      </h2>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-200 dark:border-gray-700">
              <th className="text-left py-3 px-4 text-xs font-medium text-gray-600 dark:text-gray-400">Type</th>
              <th className="text-left py-3 px-4 text-xs font-medium text-gray-600 dark:text-gray-400">Price</th>
              <th className="text-left py-3 px-4 text-xs font-medium text-gray-600 dark:text-gray-400">Quantity</th>
              <th className="text-left py-3 px-4 text-xs font-medium text-gray-600 dark:text-gray-400">Total</th>
              <th className="text-left py-3 px-4 text-xs font-medium text-gray-600 dark:text-gray-400">Time</th>
              <th className="text-left py-3 px-4 text-xs font-medium text-gray-600 dark:text-gray-400">TX Hash</th>
            </tr>
          </thead>
          <tbody>
            {trades.map((trade) => (
              <tr
                key={trade.id}
                className="border-b border-gray-100 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors"
              >
                <td className="py-3 px-4">
                  <div className="flex items-center space-x-2">
                    {trade.type === 'buy' ? (
                      <div className="flex items-center space-x-1 text-success-600 dark:text-success-400">
                        <ArrowDownRight className="w-4 h-4" />
                        <span className="font-medium text-sm">Buy</span>
                      </div>
                    ) : (
                      <div className="flex items-center space-x-1 text-danger-600 dark:text-danger-400">
                        <ArrowUpRight className="w-4 h-4" />
                        <span className="font-medium text-sm">Sell</span>
                      </div>
                    )}
                  </div>
                </td>
                <td className="py-3 px-4 text-sm font-medium text-gray-900 dark:text-white">
                  ${trade.price.toFixed(2)}
                </td>
                <td className="py-3 px-4 text-sm text-gray-700 dark:text-gray-300">
                  {trade.quantity}
                </td>
                <td className="py-3 px-4 text-sm font-medium text-gray-900 dark:text-white">
                  ${(trade.price * trade.quantity).toFixed(2)}
                </td>
                <td className="py-3 px-4 text-xs text-gray-600 dark:text-gray-400">
                  {trade.time}
                </td>
                <td className="py-3 px-4">
                  <a
                    href={`#${trade.txHash}`}
                    className="text-xs text-primary-600 dark:text-primary-400 hover:underline"
                  >
                    {trade.txHash}
                  </a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TradeHistory;
