import React, { useState, useEffect } from 'react';
import { useWeb3 } from '../hooks/useWeb3';
import { ethers } from 'ethers';

export function ConnectWallet() {
  const { isConnected, address, connect, disconnect, error, isLoading } = useWeb3();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [balance, setBalance] = useState<string>('0');
  const [network, setNetwork] = useState<string>('');

  useEffect(() => {
    const getBalance = async () => {
      if (window.ethereum && address) {
        const provider = new ethers.BrowserProvider(window.ethereum);
        const balance = await provider.getBalance(address);
        setBalance(ethers.formatEther(balance).slice(0, 6));
        
        const network = await provider.getNetwork();
        setNetwork(network.name);
      }
    };
    getBalance();
  }, [address]);

  const formatAddress = (address: string) => {
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
  };

  const copyAddressToClipboard = async () => {
    if (address) {
      await navigator.clipboard.writeText(address);
      const notification = document.createElement('div');
      notification.className = 'fixed top-4 right-4 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg transform transition-all duration-500 ease-in-out z-50';
      notification.textContent = 'Endereço copiado!';
      document.body.appendChild(notification);
      setTimeout(() => {
        notification.style.opacity = '0';
        setTimeout(() => notification.remove(), 500);
      }, 2000);
    }
  };

  const handleDisconnect = () => {
    setIsDropdownOpen(false);
    disconnect();
  };

  const viewOnExplorer = () => {
    if (address) {
      window.open(`https://goerli.etherscan.io/address/${address}`, '_blank');
    }
  };

  const switchNetwork = async () => {
    try {
      await window.ethereum.request({
        method: 'wallet_switchEthereumChain',
        params: [{ chainId: '0x5' }], // Goerli
      });
    } catch (error) {
      console.error('Erro ao trocar de rede:', error);
    }
  };

  if (!isConnected) {
    return (
      <button
        onClick={connect}
        disabled={isLoading}
        className={`
          px-6 py-3 rounded-lg transition-all duration-300
          ${isLoading ? 'bg-gray-400' : 'bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700'}
          text-white font-medium shadow-lg hover:shadow-xl transform hover:-translate-y-0.5
          flex items-center gap-3
        `}
      >
        {isLoading ? (
          <>
            <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
            <span>Conectando...</span>
          </>
        ) : (
          <>
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" 
                    d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
            <span>Conectar Carteira</span>
          </>
        )}
      </button>
    );
  }

  return (
    <div className="relative">
      <button
        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
        className="px-4 py-2 rounded-lg bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700
                   text-gray-900 dark:text-gray-100 font-medium shadow-sm flex items-center gap-3 transition-all duration-300"
      >
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse"></div>
          <span className="text-sm font-medium text-gray-600 dark:text-gray-300">{network}</span>
        </div>
        <div className="h-4 w-px bg-gray-300 dark:bg-gray-600"></div>
        <div className="flex items-center gap-2">
          <span className="text-sm font-medium">{balance} ETH</span>
          <span className="text-gray-600 dark:text-gray-300">{formatAddress(address || '')}</span>
        </div>
        <svg
          className={`w-4 h-4 transition-transform duration-300 ${isDropdownOpen ? 'rotate-180' : ''}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {isDropdownOpen && (
        <div className="absolute right-0 mt-2 w-56 rounded-lg shadow-lg bg-white dark:bg-gray-800 ring-1 ring-black ring-opacity-5 transform transition-all duration-200 ease-out">
          <div className="py-1" role="menu">
            <button
              onClick={copyAddressToClipboard}
              className="w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 flex items-center gap-3 transition-colors duration-200"
              role="menuitem"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" 
                      d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3" />
              </svg>
              Copiar Endereço
            </button>

            <button
              onClick={viewOnExplorer}
              className="w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 flex items-center gap-3 transition-colors duration-200"
              role="menuitem"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" 
                      d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
              Ver no Explorer
            </button>

            <button
              onClick={switchNetwork}
              className="w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 flex items-center gap-3 transition-colors duration-200"
              role="menuitem"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" 
                      d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
              </svg>
              Trocar Rede
            </button>

            <button
              onClick={handleDisconnect}
              className="w-full text-left px-4 py-2 text-sm text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 flex items-center gap-3 transition-colors duration-200"
              role="menuitem"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" 
                      d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
              </svg>
              Desconectar
            </button>
          </div>
        </div>
      )}

      {error && (
        <div className="absolute top-full mt-2 w-full z-50">
          <div className="bg-red-100 dark:bg-red-900/30 border border-red-400 dark:border-red-500 text-red-700 dark:text-red-400 px-4 py-2 rounded-lg text-sm shadow-md">
            {error}
          </div>
        </div>
      )}
    </div>
  );
} 