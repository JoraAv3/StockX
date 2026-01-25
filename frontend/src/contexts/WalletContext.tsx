import React, { createContext, useContext, useState, useEffect } from 'react';
import { ethers } from 'ethers';

interface WalletContextType {
  address: string | null;
  isConnected: boolean;
  connect: () => Promise<void>;
  disconnect: () => void;
  balance: string;
  provider: ethers.BrowserProvider | null;
}

const WalletContext = createContext<WalletContextType | undefined>(undefined);

export const WalletProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [address, setAddress] = useState<string | null>(null);
  const [provider, setProvider] = useState<ethers.BrowserProvider | null>(null);
  const [balance, setBalance] = useState<string>('0');

  useEffect(() => {
    if (provider && address) {
      updateBalance();
    }
  }, [provider, address]);

  const updateBalance = async () => {
    if (provider && address) {
      try {
        const bal = await provider.getBalance(address);
        setBalance(ethers.formatEther(bal));
      } catch (error) {
        console.error('Failed to fetch balance:', error);
      }
    }
  };

  const connect = async () => {
    if (typeof window.ethereum !== 'undefined') {
      try {
        const provider = new ethers.BrowserProvider(window.ethereum);
        await provider.send('eth_requestAccounts', []);
        const signer = await provider.getSigner();
        const address = await signer.getAddress();
        setProvider(provider);
        setAddress(address);
      } catch (error) {
        console.error('Failed to connect wallet:', error);
      }
    }
  };

  const disconnect = () => {
    setAddress(null);
    setProvider(null);
    setBalance('0');
  };

  return (
    <WalletContext.Provider
      value={{
        address,
        isConnected: !!address,
        connect,
        disconnect,
        balance,
        provider,
      }}
    >
      {children}
    </WalletContext.Provider>
  );
};

export const useWallet = () => {
  const context = useContext(WalletContext);
  if (!context) {
    throw new Error('useWallet must be used within WalletProvider');
  }
  return context;
};
