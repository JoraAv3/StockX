import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Wallet, BarChart3, Shield } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const CTASection: React.FC = () => {
  const navigate = useNavigate();

  const features = [
    { icon: Wallet, text: 'Connect Wallet' },
    { icon: BarChart3, text: 'Start Trading' },
    { icon: Shield, text: 'Secure & Compliant' },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-primary-600 via-primary-700 to-primary-800 dark:from-primary-900 dark:via-primary-800 dark:to-primary-900 p-12 md:p-16"
    >
      {/* Animated Background */}
      <motion.div
        className="absolute inset-0"
        animate={{
          backgroundPosition: ['0% 0%', '100% 100%'],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          repeatType: 'reverse',
        }}
        style={{
          backgroundImage: 'radial-gradient(circle at 20% 50%, rgba(255,255,255,0.1) 0%, transparent 50%), radial-gradient(circle at 80% 80%, rgba(255,255,255,0.1) 0%, transparent 50%)',
        }}
      />

      <div className="relative z-10 text-center">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-4xl md:text-5xl font-bold text-white mb-4"
        >
          Ready to Start Trading?
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="text-xl text-white/90 mb-8 max-w-2xl mx-auto"
        >
          Join thousands of traders already using StockX to trade tokenized equities with instant settlement and AI-powered insights.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="flex flex-wrap justify-center gap-4 mb-12"
        >
          <motion.button
            onClick={() => navigate('/trading')}
            className="bg-white text-primary-600 hover:bg-gray-100 font-semibold px-8 py-4 rounded-lg transition-all duration-200 flex items-center space-x-2 text-lg"
            whileHover={{ scale: 1.05, boxShadow: '0 10px 30px rgba(0,0,0,0.3)' }}
            whileTap={{ scale: 0.95 }}
          >
            <span>Get Started</span>
            <ArrowRight className="w-5 h-5" />
          </motion.button>
          <motion.button
            onClick={() => navigate('/compliance')}
            className="bg-white/10 hover:bg-white/20 backdrop-blur-sm text-white font-semibold px-8 py-4 rounded-lg transition-all duration-200 flex items-center space-x-2 text-lg border border-white/20"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <span>Learn More</span>
          </motion.button>
        </motion.div>

        {/* Quick Steps */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="flex flex-wrap justify-center gap-8"
        >
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={index}
                className="flex items-center space-x-2 text-white/90"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4 + index * 0.1 }}
                whileHover={{ scale: 1.1 }}
              >
                <Icon className="w-5 h-5" />
                <span className="font-medium">{feature.text}</span>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </motion.div>
  );
};

export default CTASection;
