export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3001/api';
export const RPC_URL = import.meta.env.VITE_RPC_URL || 'http://localhost:8545';
export const CHAIN_ID = parseInt(import.meta.env.VITE_CHAIN_ID || '1337');

export const CONTRACT_ADDRESSES = {
  TOKENIZED_STOCK: import.meta.env.VITE_TOKENIZED_STOCK_ADDRESS || '',
  ORDER_BOOK: import.meta.env.VITE_ORDER_BOOK_ADDRESS || '',
  GOVERNANCE: import.meta.env.VITE_GOVERNANCE_ADDRESS || '',
};
