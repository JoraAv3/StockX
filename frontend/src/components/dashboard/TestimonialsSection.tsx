import React from 'react';
import { motion } from 'framer-motion';
import { Quote, Star } from 'lucide-react';

const TestimonialsSection: React.FC = () => {
  const testimonials = [
    {
      name: 'Sarah Chen',
      role: 'Institutional Trader',
      company: 'Global Capital',
      content: 'StockX has revolutionized how we trade tokenized equities. The instant settlement and AI insights have significantly improved our trading efficiency.',
      rating: 5,
      avatar: 'SC',
    },
    {
      name: 'Michael Rodriguez',
      role: 'Portfolio Manager',
      company: 'Digital Assets Fund',
      content: 'The compliance features and security are top-notch. We feel confident trading large volumes knowing the platform is fully regulated.',
      rating: 5,
      avatar: 'MR',
    },
    {
      name: 'Emily Watson',
      role: 'Retail Investor',
      company: 'Independent',
      content: 'As a retail investor, I love the user-friendly interface and real-time AI signals. It\'s democratized access to institutional-grade trading.',
      rating: 5,
      avatar: 'EW',
    },
  ];

  return (
    <div className="space-y-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center"
      >
        <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
          What Our Users Say
        </h2>
        <p className="text-lg text-gray-600 dark:text-gray-400">
          Trusted by traders and institutions worldwide
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {testimonials.map((testimonial, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.2 }}
            whileHover={{ y: -10, scale: 1.02 }}
            className="card relative overflow-hidden group"
          >
            <div className="absolute top-4 right-4 opacity-10 group-hover:opacity-20 transition-opacity">
              <Quote className="w-20 h-20 text-primary-600 dark:text-primary-400" />
            </div>

            <div className="relative z-10">
              <div className="flex items-center space-x-1 mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                ))}
              </div>

              <p className="text-gray-700 dark:text-gray-300 mb-6 leading-relaxed">
                "{testimonial.content}"
              </p>

              <div className="flex items-center space-x-4 pt-4 border-t border-gray-200 dark:border-gray-700">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary-600 to-primary-400 flex items-center justify-center text-white font-bold">
                  {testimonial.avatar}
                </div>
                <div>
                  <p className="font-semibold text-gray-900 dark:text-white">
                    {testimonial.name}
                  </p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {testimonial.role}
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-500">
                    {testimonial.company}
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default TestimonialsSection;
