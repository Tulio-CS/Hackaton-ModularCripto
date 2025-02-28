import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { WalletState } from '../types';

interface WalletContextType {
  wallet: WalletState;
  connectWallet: () => Promise<void>;
  disconnectWallet: () => void;
}

const WalletContext = createContext<WalletContextType | undefined>(undefined);

export const useWallet = () => {
  const context = useContext(WalletContext);
  if (!context) {
    throw new Error('useWallet must be used within a WalletProvider');
  }
  return context;
};

interface WalletProviderProps {
  children: ReactNode;
}

export const WalletProvider: React.FC<WalletProviderProps> = ({ children }) => {
  const [wallet, setWallet] = useState<WalletState>({
    address: null,
    isConnected: false,
    isConnecting: false,
    error: null,
  });

  // Check if MetaMask is installed
  const isMetaMaskInstalled = () => {
    return typeof window !== 'undefined' && window.ethereum !== undefined;
  };

  // Connect to MetaMask wallet
  const connectWallet = async () => {
    if (!isMetaMaskInstalled()) {
      setWallet(prev => ({
        ...prev,
        error: 'MetaMask is not installed. Please install MetaMask to continue.',
      }));
      return;
    }

    try {
      setWallet(prev => ({ ...prev, isConnecting: true, error: null }));
      
      // Request account access
      const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
      
      if (accounts.length > 0) {
        setWallet({
          address: accounts[0],
          isConnected: true,
          isConnecting: false,
          error: null,
        });
      }
    } catch (error) {
      console.error('Error connecting to MetaMask', error);
      setWallet({
        address: null,
        isConnected: false,
        isConnecting: false,
        error: 'Failed to connect to wallet. Please try again.',
      });
    }
  };

  // Disconnect wallet
  const disconnectWallet = () => {
    setWallet({
      address: null,
      isConnected: false,
      isConnecting: false,
      error: null,
    });
  };

  // Listen for account changes
  useEffect(() => {
    if (isMetaMaskInstalled()) {
      const handleAccountsChanged = (accounts: string[]) => {
        if (accounts.length === 0) {
          // User disconnected their wallet
          disconnectWallet();
        } else if (wallet.address !== accounts[0]) {
          // Account changed
          setWallet(prev => ({
            ...prev,
            address: accounts[0],
            isConnected: true,
          }));
        }
      };

      window.ethereum.on('accountsChanged', handleAccountsChanged);

      // Check if already connected
      window.ethereum.request({ method: 'eth_accounts' })
        .then((accounts: string[]) => {
          if (accounts.length > 0) {
            setWallet({
              address: accounts[0],
              isConnected: true,
              isConnecting: false,
              error: null,
            });
          }
        })
        .catch((err: Error) => {
          console.error('Error checking accounts', err);
        });

      return () => {
        window.ethereum.removeListener('accountsChanged', handleAccountsChanged);
      };
    }
  }, [wallet.address]);

  return (
    <WalletContext.Provider value={{ wallet, connectWallet, disconnectWallet }}>
      {children}
    </WalletContext.Provider>
  );
};