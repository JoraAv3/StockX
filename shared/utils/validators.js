/**
 * Shared validation utilities
 */

export const validators = {
  isValidAddress(address) {
    if (!address) return false;
    return /^0x[a-fA-F0-9]{40}$/.test(address);
  },

  isValidSymbol(symbol) {
    if (!symbol) return false;
    return /^[A-Z]{1,10}$/.test(symbol.toUpperCase());
  },

  isValidPrice(price) {
    if (typeof price !== 'number') return false;
    return price > 0 && price < 1e15;
  },

  isValidQuantity(quantity) {
    if (typeof quantity !== 'number') return false;
    return quantity > 0 && quantity < 1e12;
  },

  formatAddress(address, chars = 4) {
    if (!this.isValidAddress(address)) return '';
    return `${address.slice(0, chars + 2)}...${address.slice(-chars)}`;
  },

  sanitizeInput(input) {
    if (typeof input !== 'string') return input;
    return input.trim().replace(/[<>]/g, '');
  },
};
