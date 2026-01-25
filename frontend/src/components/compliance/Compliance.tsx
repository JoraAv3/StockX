import React from 'react';
import { Shield, CheckCircle, AlertCircle, FileText, Lock } from 'lucide-react';
import ComplianceStatus from './ComplianceStatus';
import KYCStatus from './KYCStatus';
import JurisdictionInfo from './JurisdictionInfo';
import ComplianceHistory from './ComplianceHistory';
import RegulatoryDocs from './RegulatoryDocs';

const Compliance: React.FC = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
          Compliance
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          KYC/AML status and regulatory compliance information
        </p>
      </div>

      {/* Main Compliance Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ComplianceStatus />
        <KYCStatus />
      </div>

      {/* Additional Information */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <JurisdictionInfo />
        <ComplianceHistory />
      </div>

      {/* Regulatory Documentation */}
      <RegulatoryDocs />
    </div>
  );
};

export default Compliance;
