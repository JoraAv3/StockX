import React from 'react';
import { User, CheckCircle, Upload } from 'lucide-react';

const KYCStatus: React.FC = () => {
  const steps = [
    { id: 1, label: 'Identity Verification', status: 'completed' as const, icon: User },
    { id: 2, label: 'Document Upload', status: 'completed' as const, icon: Upload },
    { id: 3, label: 'Address Verification', status: 'completed' as const, icon: CheckCircle },
    { id: 4, label: 'Risk Assessment', status: 'completed' as const, icon: CheckCircle },
  ];

  return (
    <div className="card">
      <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">
        KYC Verification Steps
      </h2>
      <div className="space-y-4">
        {steps.map((step, index) => {
          const Icon = step.icon;
          const isLast = index === steps.length - 1;

          return (
            <div key={step.id} className="flex items-start space-x-4">
              <div className="flex flex-col items-center">
                <div className={`p-2 rounded-lg ${
                  step.status === 'completed'
                    ? 'bg-success-100 dark:bg-success-900/30 text-success-600 dark:text-success-400'
                    : 'bg-gray-100 dark:bg-gray-800 text-gray-400'
                }`}>
                  <Icon className="w-5 h-5" />
                </div>
                {!isLast && (
                  <div className={`w-0.5 h-12 mt-2 ${
                    step.status === 'completed'
                      ? 'bg-success-300 dark:bg-success-700'
                      : 'bg-gray-300 dark:bg-gray-700'
                  }`} />
                )}
              </div>
              <div className="flex-1 pb-6">
                <p className={`font-medium ${
                  step.status === 'completed'
                    ? 'text-gray-900 dark:text-white'
                    : 'text-gray-500 dark:text-gray-400'
                }`}>
                  {step.label}
                </p>
                {step.status === 'completed' && (
                  <p className="text-xs text-success-600 dark:text-success-400 mt-1">
                    Completed on Jan 15, 2024
                  </p>
                )}
              </div>
            </div>
          );
        })}
      </div>

      <div className="mt-6 p-4 bg-primary-50 dark:bg-primary-900/20 rounded-lg">
        <p className="text-sm text-gray-700 dark:text-gray-300">
          <strong>Note:</strong> Your KYC verification is valid for 12 months. You'll be notified 30 days before expiration.
        </p>
      </div>
    </div>
  );
};

export default KYCStatus;
