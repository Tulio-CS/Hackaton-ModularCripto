import React, { useState } from 'react';
import { useWeb3 } from '../hooks/useWeb3';
import { ethers } from 'ethers';

export function ConnectWallet() {
  const { isConnected, address, connect, error, isLoading } = useWeb3();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const formatAddress = (address: string) => {
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
  };

  const copyAddressToClipboard = async () => {
    if (address) {
      await navigator.clipboard.writeText(address);
      alert('Endereço copiado para a área de transferência!');
    }
  };

  const disconnectWallet = () => {
    // Recarrega a página para desconectar
    window.location.reload();
  };

  const viewOnExplorer = () => {
    if (address) {
      window.open(`https://goerli.etherscan.io/address/${address}`, '_blank');
    }
  };

  if (!isConnected) {
    return (
      <button
        onClick={connect}
        disabled={isLoading}
        className={`
          px-4 py-2 rounded-lg transition-all duration-300
          ${isLoading ? 'bg-gray-400' : 'bg-indigo-600 hover:bg-indigo-700'}
          text-white font-medium shadow-sm
          flex items-center gap-2
        `}
      >
        {isLoading ? (
          <>
            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
            Conectando...
          </>
        ) : (
          'Conectar Carteira'
        )}
      </button>
    );
  }

  return (
    <div className="relative">
      <button
        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
        className="px-4 py-2 rounded-lg bg-white border border-gray-200 hover:bg-gray-50 
                   text-gray-900 font-medium shadow-sm flex items-center gap-2"
      >
        <div className="w-2 h-2 rounded-full bg-green-400"></div>
        {formatAddress(address || '')}
        <svg
          className={`w-4 h-4 transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {isDropdownOpen && (
        <div className="absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
          <div className="py-1" role="menu">
            <button
              onClick={copyAddressToClipboard}
              className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center gap-2"
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
              className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center gap-2"
              role="menuitem"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" 
                      d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
              Ver no Explorer
            </button>

            <button
              onClick={disconnectWallet}
              className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 flex items-center gap-2"
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
        <div className="absolute top-full mt-2 w-full">
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-2 rounded text-sm">
            {error}
          </div>
        </div>
      )}
    </div>
  );
} 