import React, { useState, useEffect } from 'react';
import { Wallet } from 'lucide-react';
import arbitrumService from '../utils/contractInteraction';

interface ConnectWalletProps {
  onConnect: (address: string) => void;
}

const ConnectWallet: React.FC<ConnectWalletProps> = ({ onConnect }) => {
  const [isConnecting, setIsConnecting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [address, setAddress] = useState<string | null>(null);
  
  useEffect(() => {
    // Check if already connected
    const checkConnection = async () => {
      if (arbitrumService.isConnected()) {
        try {
          const account = await arbitrumService.getAccount();
          setAddress(account);
          onConnect(account);
        } catch (err) {
          console.error('Failed to get account:', err);
        }
      }
    };
    
    checkConnection();
  }, [onConnect]);
  
  const handleConnect = async () => {
    setIsConnecting(true);
    setError(null);
    
    try {
      const { address } = await arbitrumService.connect();
      setAddress(address);
      onConnect(address);
    } catch (err: any) {
      console.error('Connection error:', err);
      setError(err.message || 'Failed to connect wallet');
    } finally {
      setIsConnecting(false);
    }
  };
  
  return (
    <div>
      {address ? (
        <div className="flex items-center bg-gray-800 py-2 px-4 rounded-lg">
          <Wallet className="h-5 w-5 text-yellow-400 mr-2" />
          <span className="text-sm text-gray-300">
            {address.substring(0, 6)}...{address.substring(address.length - 4)}
          </span>
        </div>
      ) : (
        <button
          onClick={handleConnect}
          disabled={isConnecting}
          className="bg-yellow-500 hover:bg-yellow-600 text-black font-bold py-2 px-4 rounded-lg transition-colors flex items-center"
        >
          {isConnecting ? (
            <>
              <span className="animate-spin mr-2">⟳</span>
              Connecting...
            </>
          ) : (
            <>
              <Wallet className="h-5 w-5 mr-2" />
              Connect Wallet
            </>
          )}
        </button>
      )}
      
      {error && (
        <div className="text-red-500 text-sm mt-2">
          {error}
        </div>
      )}
    </div>
  );
};

export default ConnectWallet;