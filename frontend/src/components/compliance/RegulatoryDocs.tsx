import React from 'react';
import { FileText, Download, ExternalLink } from 'lucide-react';

const RegulatoryDocs: React.FC = () => {
  const documents = [
    { name: 'Terms of Service', type: 'Legal', date: 'Jan 1, 2024', size: '245 KB' },
    { name: 'Privacy Policy', type: 'Legal', date: 'Jan 1, 2024', size: '189 KB' },
    { name: 'Risk Disclosure', type: 'Regulatory', date: 'Dec 20, 2023', size: '312 KB' },
    { name: 'AML Policy', type: 'Compliance', date: 'Dec 15, 2023', size: '456 KB' },
    { name: 'KYC Requirements', type: 'Compliance', date: 'Dec 10, 2023', size: '178 KB' },
    { name: 'Trading Rules', type: 'Regulatory', date: 'Dec 5, 2023', size: '234 KB' },
  ];

  return (
    <div className="card">
      <div className="flex items-center space-x-2 mb-6">
        <FileText className="w-6 h-6 text-primary-600 dark:text-primary-400" />
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
          Regulatory Documentation
        </h2>
      </div>

      <div className="space-y-3">
        {documents.map((doc, index) => (
          <div
            key={index}
            className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-800 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors group"
          >
            <div className="flex items-center space-x-4 flex-1">
              <div className="p-2 bg-primary-100 dark:bg-primary-900/30 rounded-lg">
                <FileText className="w-5 h-5 text-primary-600 dark:text-primary-400" />
              </div>
              <div className="flex-1">
                <p className="font-medium text-gray-900 dark:text-white">{doc.name}</p>
                <div className="flex items-center space-x-3 mt-1">
                  <span className="text-xs text-gray-500 dark:text-gray-400">{doc.type}</span>
                  <span className="text-xs text-gray-500 dark:text-gray-400">•</span>
                  <span className="text-xs text-gray-500 dark:text-gray-400">{doc.date}</span>
                  <span className="text-xs text-gray-500 dark:text-gray-400">•</span>
                  <span className="text-xs text-gray-500 dark:text-gray-400">{doc.size}</span>
                </div>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <button className="p-2 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-lg transition-colors">
                <Download className="w-5 h-5 text-gray-600 dark:text-gray-400" />
              </button>
              <button className="p-2 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-lg transition-colors">
                <ExternalLink className="w-5 h-5 text-gray-600 dark:text-gray-400" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RegulatoryDocs;
