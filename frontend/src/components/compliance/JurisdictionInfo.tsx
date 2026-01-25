import React from 'react';
import { Globe, MapPin, FileCheck } from 'lucide-react';

const JurisdictionInfo: React.FC = () => {
  return (
    <div className="card">
      <div className="flex items-center space-x-2 mb-6">
        <Globe className="w-6 h-6 text-primary-600 dark:text-primary-400" />
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
          Jurisdiction Information
        </h2>
      </div>

      <div className="space-y-4">
        <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
          <div className="flex items-center space-x-2 mb-2">
            <MapPin className="w-4 h-4 text-gray-500" />
            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
              Registered Jurisdiction
            </span>
          </div>
          <p className="text-lg font-bold text-gray-900 dark:text-white">
            United States
          </p>
        </div>

        <div className="space-y-2">
          <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
            Permitted Jurisdictions
          </h3>
          <div className="flex flex-wrap gap-2">
            {['US', 'UK', 'CA', 'AU', 'DE', 'FR'].map((country) => (
              <span
                key={country}
                className="px-3 py-1 bg-success-100 dark:bg-success-900/30 text-success-700 dark:text-success-400 rounded-full text-xs font-medium"
              >
                {country}
              </span>
            ))}
          </div>
        </div>

        <div className="space-y-2">
          <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
            Restricted Jurisdictions
          </h3>
          <div className="flex flex-wrap gap-2">
            {['CN', 'KP', 'IR'].map((country) => (
              <span
                key={country}
                className="px-3 py-1 bg-danger-100 dark:bg-danger-900/30 text-danger-700 dark:text-danger-400 rounded-full text-xs font-medium"
              >
                {country}
              </span>
            ))}
          </div>
        </div>

        <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
          <div className="flex items-start space-x-2">
            <FileCheck className="w-4 h-4 text-gray-500 mt-0.5" />
            <p className="text-xs text-gray-600 dark:text-gray-400">
              Jurisdiction restrictions are automatically enforced on-chain. Transfers to restricted addresses will be rejected.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JurisdictionInfo;
