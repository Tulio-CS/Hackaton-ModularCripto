import { useState, useEffect, useCallback } from 'react';
import { ethers } from 'ethers';
import { CONTRACT_ADDRESS, CONTRACT_ABI, NETWORK_CONFIG } from '../config/contracts';

export function useWeb3() {
  const [isConnected, setIsConnected] = useState(false);
  const [address, setAddress] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [contract, setContract] = useState<ethers.Contract | null>(null);
  const [signer, setSigner] = useState<ethers.JsonRpcSigner | null>(null);
  const [balance, setBalance] = useState<string | null>(null);
  const [chainId, setChainId] = useState<string | null>(null);

  const disconnect = useCallback(() => {
    setIsConnected(false);
    setAddress(null);
    setContract(null);
    setSigner(null);
    setBalance(null);
    setChainId(null);
    localStorage.setItem('walletDisconnected', 'true');

    // Remove os listeners existentes
    if (window.ethereum) {
      window.ethereum.removeAllListeners('accountsChanged');
      window.ethereum.removeAllListeners('chainChanged');
    }

    // Força a limpeza do cache da carteira
    if (window.ethereum && window.ethereum._state) {
      try {
        // @ts-ignore
        window.ethereum._state.accounts = [];
        // @ts-ignore
        window.ethereum._state.isConnected = false;
      } catch (err) {
        console.error('Erro ao limpar estado da carteira:', err);
      }
    }
  }, []);

  const updateBalance = useCallback(async () => {
    if (address && window.ethereum) {
      try {
        const provider = new ethers.BrowserProvider(window.ethereum);
        const balance = await provider.getBalance(address);
        setBalance(ethers.formatEther(balance));
      } catch (err) {
        console.error('Erro ao atualizar saldo:', err);
      }
    }
  }, [address]);

  const updateChainId = useCallback(async () => {
    if (window.ethereum) {
      try {
        const chainId = await window.ethereum.request({ method: 'eth_chainId' });
        setChainId(chainId);
      } catch (err) {
        console.error('Erro ao obter chainId:', err);
      }
    }
  }, []);

  const connect = useCallback(async () => {
    if (!window.ethereum) {
      setError('Por favor, instale uma carteira Web3 como MetaMask');
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      // Remove o flag de desconexão antes de tentar conectar
      localStorage.removeItem('walletDisconnected');

      const accounts = await window.ethereum.request({
        method: 'eth_requestAccounts',
      });

      if (accounts.length > 0) {
        setAddress(accounts[0]);
        setIsConnected(true);

        // Configura o provider e signer
        const provider = new ethers.BrowserProvider(window.ethereum);
        const signer = await provider.getSigner();
        setSigner(signer);

        // Inicializa o contrato
        const contract = new ethers.Contract(CONTRACT_ADDRESS, CONTRACT_ABI, signer);
        setContract(contract);

        // Atualiza saldo e chainId
        await Promise.all([updateBalance(), updateChainId()]);
      }
    } catch (err: any) {
      if (err.code === 4001) {
        setError('Conexão rejeitada pelo usuário');
      } else {
        setError('Erro ao conectar carteira');
        console.error('Erro ao conectar:', err);
      }
      disconnect(); // Garante que tudo seja limpo em caso de erro
    } finally {
      setIsLoading(false);
    }
  }, [updateBalance, updateChainId, disconnect]);

  const checkAndAddNetwork = async () => {
    try {
      await window.ethereum.request({
        method: 'wallet_switchEthereumChain',
        params: [{ chainId: NETWORK_CONFIG.chainId }],
      });
    } catch (error: any) {
      if (error.code === 4902) {
        await window.ethereum.request({
          method: 'wallet_addEthereumChain',
          params: [NETWORK_CONFIG],
        });
      } else {
        throw error;
      }
    }
  };

  const createEvent = useCallback(async (
    name: string,
    description: string,
    price: string,
    maxTickets: number
  ) => {
    if (!contract) throw new Error('Contrato não inicializado');
    
    try {
      const priceInWei = ethers.parseEther(price);
      const tx = await contract.createEvent(name, description, priceInWei.toString(), maxTickets);
      await tx.wait();
      return tx;
    } catch (err: any) {
      console.error('Erro ao criar evento:', err);
      throw err;
    }
  }, [contract]);

  const buyTicket = useCallback(async (eventId: number, value: string) => {
    if (!contract) throw new Error('Contrato não inicializado');
    
    try {
      const tx = await contract.purchaseTicket(eventId, {
        value: ethers.parseEther(value)
      });
      await tx.wait();
      return tx;
    } catch (err: any) {
      console.error('Erro ao comprar ticket:', err);
      throw err;
    }
  }, [contract]);

  useEffect(() => {
    const checkConnection = async () => {
      if (window.ethereum) {
        try {
          const isDisconnected = localStorage.getItem('walletDisconnected');
          if (isDisconnected === 'true') {
            disconnect();
            return;
          }

          const accounts = await window.ethereum.request({ method: 'eth_accounts' });
          if (accounts.length > 0) {
            connect();
          }
        } catch (err) {
          console.error('Erro ao verificar conexão:', err);
          disconnect();
        }
      }
    };

    checkConnection();
  }, [connect, disconnect]);

  useEffect(() => {
    if (window.ethereum) {
      const handleAccountsChanged = (accounts: string[]) => {
        if (accounts.length === 0) {
          disconnect();
        } else {
          setAddress(accounts[0]);
          setIsConnected(true);
          localStorage.removeItem('walletDisconnected');
          updateBalance();
        }
      };

      const handleChainChanged = () => {
        window.location.reload();
      };

      window.ethereum.on('accountsChanged', handleAccountsChanged);
      window.ethereum.on('chainChanged', handleChainChanged);

      return () => {
        window.ethereum.removeListener('accountsChanged', handleAccountsChanged);
        window.ethereum.removeListener('chainChanged', handleChainChanged);
      };
    }
  }, [disconnect, updateBalance]);

  return {
    isConnected,
    address,
    isLoading,
    error,
    contract,
    balance,
    chainId,
    connect,
    disconnect,
    createEvent,
    buyTicket,
    updateBalance
  };
} 