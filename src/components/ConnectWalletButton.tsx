import React from 'react';
import { useWeb3 } from '../context/Web3Context';

const ConnectWalletButton: React.FC = () => {
  const { account, isConnected, connectWallet, disconnectWallet, error } = useWeb3();

  const formatAddress = (address: string) => {
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
  };

  return (
    <div>
      {error && (
        <p className="text-red-500 text-sm mb-2">{error}</p>
      )}
      <button
        onClick={isConnected ? disconnectWallet : connectWallet}
        className={`
          px-4 py-2 rounded-2xl transition-all duration-300
          flex items-center gap-2 shadow-sm
          ${isConnected 
            ? 'bg-gray-100/50 text-gray-900 hover:bg-gray-200/50' 
            : 'bg-black text-white hover:bg-gray-900'
          }
        `}
      >
        {isConnected ? (
          <>
            <span className="w-2 h-2 rounded-full bg-green-400"></span>
            {formatAddress(account || '')}
          </>
        ) : (
          'Conectar Carteira'
        )}
      </button>
    </div>
  );
};

export default ConnectWalletButton; 