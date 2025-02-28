import React, { ReactNode, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import ConnectWalletButton from '../ConnectWalletButton';
import Footer from './Footer';

interface LayoutProps {
  children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <header className="sticky top-0 left-0 right-0 z-50">
        <nav 
          className={`
            w-full
            transition-all duration-300 ease-in-out
            ${isScrolled 
              ? 'bg-white/80 backdrop-blur-xl shadow-sm border-b border-gray-200/50' 
              : 'bg-white/70 backdrop-blur-lg'
            }
          `}
        >
          <div className="container mx-auto px-4">
            <div className="flex justify-between items-center h-16">
              <div className="flex items-center gap-8">
                <Link to="/" className="text-xl font-medium text-black hover:text-gray-600 transition-colors">
                  NFTickets
                </Link>
                <div className="hidden md:flex items-center gap-6">
                  <Link to="/explore" className="font-medium text-gray-600 hover:text-black transition-colors">
                    Explorar
                  </Link>
                  <Link to="/dashboard" className="font-medium text-gray-600 hover:text-black transition-colors">
                    Meus Ingressos
                  </Link>
                  <Link to="/organizer" className="font-medium text-gray-600 hover:text-black transition-colors">
                    Organizador
                  </Link>
                  <Link to="/how-it-works" className="font-medium text-gray-600 hover:text-black transition-colors">
                    Como Funciona
                  </Link>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <ConnectWalletButton />
                <button
                  onClick={() => setIsMenuOpen(!isMenuOpen)}
                  className="md:hidden p-2 text-gray-600 hover:text-black transition-colors"
                >
                  {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
                </button>
              </div>
            </div>
          </div>

          {/* Menu Mobile */}
          <div 
            className={`
              md:hidden 
              transition-all duration-300 ease-in-out
              ${isMenuOpen 
                ? 'max-h-64 opacity-100 bg-white/80 backdrop-blur-xl border-t border-gray-200/50 shadow-lg' 
                : 'max-h-0 opacity-0 overflow-hidden'
              }
            `}
          >
            <div className="container mx-auto px-4 py-4 space-y-4">
              <Link 
                to="/explore" 
                className="block font-medium text-gray-600 hover:text-black transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Explorar
              </Link>
              <Link 
                to="/dashboard" 
                className="block font-medium text-gray-600 hover:text-black transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Meus Ingressos
              </Link>
              <Link 
                to="/organizer" 
                className="block font-medium text-gray-600 hover:text-black transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Organizador
              </Link>
              <Link 
                to="/how-it-works" 
                className="block font-medium text-gray-600 hover:text-black transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Como Funciona
              </Link>
            </div>
          </div>
        </nav>
      </header>

      <main className="min-h-screen bg-white">
        {children}
      </main>

      <Footer />
    </>
  );
};

export default Layout;