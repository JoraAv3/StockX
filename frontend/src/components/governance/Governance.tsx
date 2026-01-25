import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Vote, FileText, CheckCircle, XCircle, Clock } from 'lucide-react';
import ProposalList from './ProposalList';
import CreateProposal from './CreateProposal';
import VotingStats from './VotingStats';

const Governance: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'active' | 'passed' | 'create'>('active');

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
          Governance
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          DAO governance and voting on protocol changes
        </p>
      </div>

      {/* Tabs */}
      <div className="flex space-x-4 border-b border-gray-200 dark:border-gray-700">
        <button
          onClick={() => setActiveTab('active')}
          className={`pb-4 px-2 font-medium transition-colors ${
            activeTab === 'active'
              ? 'text-primary-600 dark:text-primary-400 border-b-2 border-primary-600'
              : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
          }`}
        >
          Active Proposals
        </button>
        <button
          onClick={() => setActiveTab('passed')}
          className={`pb-4 px-2 font-medium transition-colors ${
            activeTab === 'passed'
              ? 'text-primary-600 dark:text-primary-400 border-b-2 border-primary-600'
              : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
          }`}
        >
          Passed Proposals
        </button>
        <button
          onClick={() => setActiveTab('create')}
          className={`pb-4 px-2 font-medium transition-colors ${
            activeTab === 'create'
              ? 'text-primary-600 dark:text-primary-400 border-b-2 border-primary-600'
              : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
          }`}
        >
          Create Proposal
        </button>
      </div>

      {/* Content */}
      {activeTab === 'active' && <ProposalList status="active" />}
      {activeTab === 'passed' && <ProposalList status="passed" />}
      {activeTab === 'create' && <CreateProposal />}

      {/* Voting Stats */}
      <VotingStats />
    </div>
  );
};

export default Governance;
