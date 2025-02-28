import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Ticket, Wallet } from 'lucide-react';
import Button from '../ui/Button';
import { useWallet } from '../../context/WalletContext';

const Header: React.FC = () => {
  const { wallet, connectWallet, disconnectWallet } = useWallet();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const formatAddress = (address: string) => {
    return `${address.substring(0, 6)}...${address.substring(address.length - 4)}`;
  };

  return (
    <header className="sticky top-0 z-50 bg-neutral-900 backdrop-blur-md border-b border-neutral-800">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center">
          <motion.div
            initial={{ rotate: -10 }}
            animate={{ rotate: 0 }}
            className="mr-2"
          >
            <Ticket size={28} className="text-primary" />
          </motion.div>
          <h1 className="text-2xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            Festia
          </h1>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          <a href="#" className="text-neutral-200 hover:text-primary transition-colors">
            Explorar
          </a>
          <a href="#" className="text-neutral-200 hover:text-primary transition-colors">
            Meus Ingressos
          </a>
          <a href="#" className="text-neutral-200 hover:text-primary transition-colors">
            Vender
          </a>
          <a href="#" className="text-neutral-200 hover:text-primary transition-colors">
            Como Funciona
          </a>
        </nav>

        {/* Wallet Connection */}
        <div className="hidden md:block">
          {wallet.isConnected ? (
            <div className="flex items-center">
              <div className="mr-3 flex items-center">
                <div className="h-2 w-2 rounded-full bg-success mr-2"></div>
                <span className="text-sm text-neutral-700">
                  {formatAddress(wallet.address || '')}
                </span>
              </div>
              <Button 
                variant="outline" 
                size="sm" 
                onClick={disconnectWallet}
                icon={<Wallet size={16} />}
              >
                Disconnect
              </Button>
            </div>
          ) : (
            <Button 
              onClick={connectWallet} 
              isLoading={wallet.isConnecting}
              icon={<Wallet size={16} />}
            >
              Connect Wallet
            </Button>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button 
          className="md:hidden text-neutral-800"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={isMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} />
          </svg>
        </button>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <motion.div 
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          className="md:hidden bg-white border-t border-neutral-200"
        >
          <div className="container mx-auto px-4 py-4 flex flex-col space-y-4">
            <a href="#" className="text-neutral-800 py-2 border-b border-neutral-100">
              Explore
            </a>
            <a href="#" className="text-neutral-800 py-2 border-b border-neutral-100">
              My Tickets
            </a>
            <a href="#" className="text-neutral-800 py-2 border-b border-neutral-100">
              Sell
            </a>
            <a href="#" className="text-neutral-800 py-2 border-b border-neutral-100">
              How It Works
            </a>
            
            {wallet.isConnected ? (
              <div className="flex items-center justify-between py-2">
                <span className="text-sm text-neutral-700">
                  {formatAddress(wallet.address || '')}
                </span>
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={disconnectWallet}
                >
                  Disconnect
                </Button>
              </div>
            ) : (
              <Button 
                onClick={connectWallet} 
                isLoading={wallet.isConnecting}
                fullWidth
              >
                Connect Wallet
              </Button>
            )}
          </div>
        </motion.div>
      )}
    </header>
  );
};

export default Header;