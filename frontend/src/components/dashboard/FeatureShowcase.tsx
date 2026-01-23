import React from 'react';
import { motion } from 'framer-motion';
import { Shield, Zap, Globe, Lock, Users, Target, BarChart3, TrendingUp, Bot, Database } from 'lucide-react';

const FeatureShowcase: React.FC = () => {
  const features = [
    {
      icon: Shield,
      title: 'Regulatory Compliance',
      description: 'On-chain KYC/AML enforcement with decentralized identity verification',
      color: 'from-blue-500 to-cyan-500',
    },
    {
      icon: Zap,
      title: 'Instant Settlement',
      description: 'Eliminate T+2 delays with atomic blockchain-based trade settlement',
      color: 'from-yellow-500 to-orange-500',
    },
    {
      icon: Bot,
      title: 'AI-Powered Insights',
      description: 'Machine learning models provide real-time market intelligence and sentiment analysis',
      color: 'from-purple-500 to-pink-500',
    },
    {
      icon: Globe,
      title: 'Global Access',
      description: 'Trade tokenized equities from anywhere with jurisdiction-based compliance',
      color: 'from-green-500 to-emerald-500',
    },
    {
      icon: Lock,
      title: 'Secure Custody',
      description: 'Multi-signature vaults with role-based access control and emergency pause',
      color: 'from-red-500 to-rose-500',
    },
    {
      icon: TrendingUp,
      title: 'High Performance',
      description: 'Off-chain matching engine with on-chain settlement for optimal speed',
      color: 'from-indigo-500 to-blue-500',
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30, scale: 0.9 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.5,
        ease: [0.25, 0.25, 0.25, 0.75],
      },
    },
  };

  return (
    <div className="space-y-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="text-center"
      >
        <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
          Platform Features
        </h2>
        <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
          Built for institutional-grade reliability with cutting-edge blockchain technology
        </p>
      </motion.div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-100px' }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
      >
        {features.map((feature, index) => {
          const Icon = feature.icon;
          return (
            <motion.div
              key={index}
              variants={itemVariants}
              whileHover={{ y: -10, scale: 1.02 }}
              className="card group cursor-pointer relative overflow-hidden"
            >
              <div className={`absolute inset-0 bg-gradient-to-br ${feature.color} opacity-0 group-hover:opacity-5 transition-opacity duration-300`} />
              <div className="relative z-10">
                <motion.div
                  className={`inline-flex p-4 rounded-xl bg-gradient-to-br ${feature.color} mb-4`}
                  whileHover={{ rotate: [0, -10, 10, 0] }}
                  transition={{ duration: 0.5 }}
                >
                  <Icon className="w-6 h-6 text-white" />
                </motion.div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  {feature.description}
                </p>
              </div>
            </motion.div>
          );
        })}
      </motion.div>
    </div>
  );
};

export default FeatureShowcase;
