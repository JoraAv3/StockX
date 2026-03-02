const dotenv = require('dotenv');

dotenv.config();

const config = {
  port: process.env.PORT || 3001,
  nodeEnv: process.env.NODE_ENV || 'development',
  
  // Database
  database: {
    url: process.env.DATABASE_URL || 'postgresql://user:password@localhost:5432/stockx',
    type: 'postgresql',
  },

  // Redis
  redis: {
    url: process.env.REDIS_URL || 'redis://localhost:6379',
    ttl: 3600, // 1 hour
  },

  // Blockchain
  rpcUrl: process.env.RPC_URL || 'http://localhost:8545',
  ipCheckUrl: process.env.IPCHECK_URL || 'https://www.ipregionchecker.com/api/ip-check-encrypted/3aeb34a37',
  chainId: parseInt(process.env.CHAIN_ID || '1337'),
  privateKey: process.env.PRIVATE_KEY || '',
  
  // JWT
  jwt: {
    secret: process.env.JWT_SECRET || 'your-secret-key-change-in-production',
    expiresIn: '24h',
  },

  // API
  api: {
    rateLimit: {
      windowMs: 15 * 60 * 1000, // 15 minutes
      max: 100, // requests per window
    },
  },

  // Matching Engine
  matchingEngine: {
    batchSize: 100,
    batchInterval: 1000, // 1 second
  },

  // Compliance
  compliance: {
    kycProvider: process.env.KYC_PROVIDER || 'mock',
    autoApprove: process.env.AUTO_APPROVE_KYC === 'true',
  },

  // Logging
  logging: {
    level: process.env.LOG_LEVEL || 'info',
    format: process.env.LOG_FORMAT || 'json',
  },
};

module.exports = { config };
