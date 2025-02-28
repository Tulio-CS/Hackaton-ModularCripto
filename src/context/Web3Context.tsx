import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { ethers } from 'ethers';

// Declaração de tipos para ethereum no window
declare global {
  interface Window {
    ethereum: any;
  }
}

interface Web3ContextType {
  account: string | null;
  chainId: number | null;
  isConnected: boolean;
  provider: ethers.BrowserProvider | null;
  connectWallet: () => Promise<void>;
  disconnectWallet: () => void;
  error: string | null;
}

const Web3Context = createContext<Web3ContextType | null>(null);

export const Web3Provider = ({ children }: { children: ReactNode }) => {
  const [account, setAccount] = useState<string | null>(null);
  const [chainId, setChainId] = useState<number | null>(null);
  const [provider, setProvider] = useState<ethers.BrowserProvider | null>(null);
  const [error, setError] = useState<string | null>(null);

  // Inicializa o provider e verifica se já está conectado
  useEffect(() => {
    const initProvider = async () => {
      if (window.ethereum) {
        try {
          const provider = new ethers.BrowserProvider(window.ethereum);
          setProvider(provider);

          // Verifica se já existe uma conta conectada
          const accounts = await provider.listAccounts();
          if (accounts.length > 0) {
            setAccount(accounts[0].address);
          }

          // Obtém a rede atual
          const network = await provider.getNetwork();
          setChainId(Number(network.chainId));
        } catch (err) {
          console.error('Erro ao inicializar provider:', err);
          setError('Erro ao conectar com a carteira');
        }
      }
    };

    initProvider();
  }, []);

  // Listeners para eventos da MetaMask
  useEffect(() => {
    if (window.ethereum) {
      // Mudança de conta
      window.ethereum.on('accountsChanged', (accounts: string[]) => {
        if (accounts.length > 0) {
          setAccount(accounts[0]);
        } else {
          setAccount(null);
        }
      });

      // Mudança de rede
      window.ethereum.on('chainChanged', (newChainId: string) => {
        setChainId(Number(newChainId));
      });

      // Desconexão
      window.ethereum.on('disconnect', () => {
        setAccount(null);
        setChainId(null);
      });

      return () => {
        window.ethereum.removeListener('accountsChanged', () => {});
        window.ethereum.removeListener('chainChanged', () => {});
        window.ethereum.removeListener('disconnect', () => {});
      };
    }
  }, []);

  const connectWallet = async () => {
    if (!window.ethereum) {
      setError('Por favor, instale a MetaMask!');
      return;
    }

    try {
      setError(null);
      const accounts = await window.ethereum.request({
        method: 'eth_requestAccounts'
      });

      if (accounts.length > 0) {
        setAccount(accounts[0]);
        
        // Atualiza o chainId após a conexão
        const provider = new ethers.BrowserProvider(window.ethereum);
        const network = await provider.getNetwork();
        setChainId(Number(network.chainId));
      }
    } catch (err) {
      console.error('Erro ao conectar carteira:', err);
      setError('Erro ao conectar com a carteira');
    }
  };

  const disconnectWallet = () => {
    setAccount(null);
    setChainId(null);
    setError(null);
  };

  return (
    <Web3Context.Provider value={{
      account,
      chainId,
      isConnected: !!account,
      provider,
      connectWallet,
      disconnectWallet,
      error
    }}>
      {children}
    </Web3Context.Provider>
  );
};

export const useWeb3 = () => {
  const context = useContext(Web3Context);
  if (!context) {
    throw new Error('useWeb3 deve ser usado dentro de um Web3Provider');
  }
  return context;
}; 