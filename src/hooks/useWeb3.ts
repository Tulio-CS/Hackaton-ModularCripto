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
    if (typeof window.ethereum === 'undefined') {
      throw new Error('MetaMask não está instalado');
    }

    try {
      setIsLoading(true);
      setError(null);

      // Solicita conexão com a carteira
      await window.ethereum.request({ method: 'eth_requestAccounts' });
      
      // Configura o provider
      const provider = new ethers.BrowserProvider(window.ethereum);
      
      // Obtém o signer
      const signer = await provider.getSigner();
      setSigner(signer);
      
      // Inicializa o contrato
      const contract = new ethers.Contract(
        CONTRACT_ADDRESS,
        CONTRACT_ABI,
        signer
      );
      setContract(contract);

      // Verifica e adiciona a rede se necessário
      await checkAndAddNetwork();

      setIsConnected(true);
      const userAddress = await signer.getAddress();
      setAddress(userAddress);

      // Atualiza saldo e chainId
      await Promise.all([updateBalance(), updateChainId()]);
    } catch (err: any) {
      console.error('Erro ao conectar:', err);
      setError(err.message || 'Erro ao conectar com a carteira');
      setIsConnected(false);
    } finally {
      setIsLoading(false);
    }
  }, [updateBalance, updateChainId]);

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
      const tx = await contract.createEvent(name, description, price, maxTickets);
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
        value: value
      });
      await tx.wait();
      return tx;
    } catch (err: any) {
      console.error('Erro ao comprar ticket:', err);
      throw err;
    }
  }, [contract]);

  useEffect(() => {
    // Verifica se já está conectado ao carregar o componente
    if (window.ethereum) {
      window.ethereum.request({ method: 'eth_accounts' })
        .then((accounts: string[]) => {
          if (accounts.length > 0) {
            connect();
          }
        });

      // Listeners para mudanças na carteira
      window.ethereum.on('accountsChanged', (accounts: string[]) => {
        if (accounts.length === 0) {
          setIsConnected(false);
          setAddress(null);
          setContract(null);
          setSigner(null);
          setBalance(null);
        } else {
          connect();
        }
      });

      window.ethereum.on('chainChanged', () => {
        updateChainId();
        window.location.reload();
      });

      // Atualiza o saldo periodicamente
      const balanceInterval = setInterval(updateBalance, 15000); // A cada 15 segundos

      return () => {
        if (window.ethereum) {
          window.ethereum.removeAllListeners();
        }
        clearInterval(balanceInterval);
      };
    }
  }, [connect, updateBalance, updateChainId]);

  return {
    isConnected,
    address,
    isLoading,
    error,
    contract,
    balance,
    chainId,
    connect,
    createEvent,
    buyTicket,
    updateBalance
  };
} 