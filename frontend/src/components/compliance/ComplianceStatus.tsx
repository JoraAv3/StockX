import React from 'react';
import { Shield, CheckCircle, AlertCircle, Clock } from 'lucide-react';
import { useWallet } from '@/contexts/WalletContext';

const ComplianceStatus: React.FC = () => {
  const { address, isConnected } = useWallet();

  const status = isConnected ? 'approved' : 'pending'; // Mock status

  const statusConfig = {
    approved: {
      icon: CheckCircle,
      color: 'text-success-600 dark:text-success-400',
      bgColor: 'bg-success-100 dark:bg-success-900/30',
      text: 'Compliant',
      description: 'Your account is fully compliant and ready to trade',
    },
    pending: {
      icon: Clock,
      color: 'text-warning-600 dark:text-warning-400',
      bgColor: 'bg-warning-100 dark:bg-warning-900/30',
      text: 'Pending Verification',
      description: 'Your KYC verification is in progress',
    },
    rejected: {
      icon: AlertCircle,
      color: 'text-danger-600 dark:text-danger-400',
      bgColor: 'bg-danger-100 dark:bg-danger-900/30',
      text: 'Not Compliant',
      description: 'Please complete KYC verification to trade',
    },
  };

  const config = statusConfig[status];

  return (
    <div className="card">
      <div className="flex items-center space-x-2 mb-6">
        <Shield className="w-6 h-6 text-primary-600 dark:text-primary-400" />
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
          Compliance Status
        </h2>
      </div>

      <div className="space-y-4">
        <div className={`p-4 ${config.bgColor} rounded-lg`}>
          <div className="flex items-center space-x-3 mb-2">
            <config.icon className={`w-6 h-6 ${config.color}`} />
            <span className={`text-lg font-semibold ${config.color}`}>
              {config.text}
            </span>
          </div>
          <p className="text-sm text-gray-700 dark:text-gray-300">
            {config.description}
          </p>
        </div>

        <div className="space-y-3">
          <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
            <span className="text-sm text-gray-600 dark:text-gray-400">KYC Status</span>
            <span className="text-sm font-medium text-success-600 dark:text-success-400">
              Verified
            </span>
          </div>
          <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
            <span className="text-sm text-gray-600 dark:text-gray-400">AML Status</span>
            <span className="text-sm font-medium text-success-600 dark:text-success-400">
              Clear
            </span>
          </div>
          <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
            <span className="text-sm text-gray-600 dark:text-gray-400">Whitelist Status</span>
            <span className="text-sm font-medium text-success-600 dark:text-success-400">
              Active
            </span>
          </div>
          <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
            <span className="text-sm text-gray-600 dark:text-gray-400">Expiry Date</span>
            <span className="text-sm font-medium text-gray-900 dark:text-white">
              Dec 31, 2024
            </span>
          </div>
        </div>

        {!isConnected && (
          <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
            <button className="w-full btn-primary">
              Connect Wallet to View Status
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ComplianceStatus;
