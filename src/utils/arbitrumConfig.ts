import { ethers } from 'ethers';

// Arbitrum network configuration
export const ARBITRUM_CONFIG = {
  // Arbitrum One (mainnet)
  mainnet: {
    chainId: '0xa4b1', // 42161 in decimal
    chainName: 'Arbitrum One',
    nativeCurrency: {
      name: 'Ether',
      symbol: 'ETH',
      decimals: 18,
    },
    rpcUrls: ['https://arb1.arbitrum.io/rpc'],
    blockExplorerUrls: ['https://arbiscan.io/'],
  },
  // Arbitrum Goerli (testnet)
  testnet: {
    chainId: '0x66eed', // 421613 in decimal
    chainName: 'Arbitrum Goerli',
    nativeCurrency: {
      name: 'Ether',
      symbol: 'ETH',
      decimals: 18,
    },
    rpcUrls: ['https://goerli-rollup.arbitrum.io/rpc'],
    blockExplorerUrls: ['https://goerli.arbiscan.io/'],
  },
  // Arbitrum Sepolia (testnet)
  sepolia: {
    chainId: '0x66eee', // 421614 in decimal
    chainName: 'Arbitrum Sepolia',
    nativeCurrency: {
      name: 'Ether',
      symbol: 'ETH',
      decimals: 18,
    },
    rpcUrls: ['https://sepolia-rollup.arbitrum.io/rpc'],
    blockExplorerUrls: ['https://sepolia.arbiscan.io/'],
  }
};

// Helper function to add Arbitrum network to MetaMask
export const addArbitrumNetwork = async (networkType: 'mainnet' | 'testnet' | 'sepolia' = 'testnet') => {
  if (!window.ethereum) {
    throw new Error('MetaMask is not installed');
  }

  const config = ARBITRUM_CONFIG[networkType];
  
  try {
    await window.ethereum.request({
      method: 'wallet_addEthereumChain',
      params: [
        {
          chainId: config.chainId,
          chainName: config.chainName,
          nativeCurrency: config.nativeCurrency,
          rpcUrls: config.rpcUrls,
          blockExplorerUrls: config.blockExplorerUrls,
        },
      ],
    });
    return true;
  } catch (error) {
    console.error('Failed to add Arbitrum network:', error);
    throw error;
  }
};

// Helper function to switch to Arbitrum network
export const switchToArbitrumNetwork = async (networkType: 'mainnet' | 'testnet' | 'sepolia' = 'testnet') => {
  if (!window.ethereum) {
    throw new Error('MetaMask is not installed');
  }

  const config = ARBITRUM_CONFIG[networkType];
  
  try {
    await window.ethereum.request({
      method: 'wallet_switchEthereumChain',
      params: [{ chainId: config.chainId }],
    });
    return true;
  } catch (error: any) {
    // If the chain hasn't been added to MetaMask
    if (error.code === 4902) {
      return addArbitrumNetwork(networkType);
    }
    console.error('Failed to switch to Arbitrum network:', error);
    throw error;
  }
};

// Get provider for Arbitrum
export const getArbitrumProvider = (networkType: 'mainnet' | 'testnet' | 'sepolia' = 'testnet') => {
  const config = ARBITRUM_CONFIG[networkType];
  return new ethers.providers.JsonRpcProvider(config.rpcUrls[0]);
};

// Declare window.ethereum for TypeScript
declare global {
  interface Window {
    ethereum?: any;
  }
}