import React, { useState, useEffect } from 'react';
import { ConnectWallet } from './components/ConnectWallet';
import { CreateEvent } from './components/CreateEvent';
import { EventList } from './components/EventList';
import { MyTickets } from './components/MyTickets';

function App() {
  const [activeTab, setActiveTab] = useState('events');
  const [darkMode, setDarkMode] = useState(() => {
    const saved = localStorage.getItem('darkMode');
    return saved ? JSON.parse(saved) : false;
  });

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    localStorage.setItem('darkMode', JSON.stringify(darkMode));
  }, [darkMode]);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  const Information = () => (
    <div className="space-y-6">
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Como Funciona o Festia</h2>
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          <div className="bg-gray-50 dark:bg-gray-700/50 p-6 rounded-lg">
            <div className="flex items-center justify-center w-12 h-12 mb-4 bg-indigo-100 dark:bg-indigo-900/50 rounded-full">
              <svg className="w-6 h-6 text-indigo-600 dark:text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v1m6 11h2m-6 0h-2v4m0-11v3m0 0h.01M12 12h4.01M16 20h4M4 12h4m12 0h.01M5 8h2a1 1 0 001-1V5a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1zm12 0h2a1 1 0 001-1V5a1 1 0 00-1-1h-2a1 1 0 00-1 1v2a1 1 0 001 1zM5 20h2a1 1 0 001-1v-2a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1z" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">1. Conecte sua Carteira</h3>
            <p className="text-gray-600 dark:text-gray-300">
              Use sua carteira Web3 (como MetaMask) para se conectar à plataforma e começar a explorar eventos.
            </p>
          </div>

          <div className="bg-gray-50 dark:bg-gray-700/50 p-6 rounded-lg">
            <div className="flex items-center justify-center w-12 h-12 mb-4 bg-purple-100 dark:bg-purple-900/50 rounded-full">
              <svg className="w-6 h-6 text-purple-600 dark:text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 5v2m0 4v2m0 4v2M5 5a2 2 0 00-2 2v3a2 2 0 110 4v3a2 2 0 002 2h14a2 2 0 002-2v-3a2 2 0 110-4V7a2 2 0 00-2-2H5z" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">2. Compre Ingressos</h3>
            <p className="text-gray-600 dark:text-gray-300">
              Escolha eventos do seu interesse e compre ingressos NFT de forma segura e transparente.
            </p>
          </div>

          <div className="bg-gray-50 dark:bg-gray-700/50 p-6 rounded-lg">
            <div className="flex items-center justify-center w-12 h-12 mb-4 bg-pink-100 dark:bg-pink-900/50 rounded-full">
              <svg className="w-6 h-6 text-pink-600 dark:text-pink-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">3. Gerencie seus Ingressos</h3>
            <p className="text-gray-600 dark:text-gray-300">
              Acompanhe seus ingressos, histórico de transações e transferências na aba "Meus Ingressos".
            </p>
          </div>
        </div>

        <div className="mt-8 p-6 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Para Organizadores de Eventos</h3>
          <div className="space-y-4">
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0">
                <div className="flex items-center justify-center w-8 h-8 bg-green-100 dark:bg-green-900/50 rounded-full">
                  <svg className="w-4 h-4 text-green-600 dark:text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                  </svg>
                </div>
              </div>
              <div>
                <h4 className="text-lg font-medium text-gray-900 dark:text-white">Crie seu Evento</h4>
                <p className="text-gray-600 dark:text-gray-300">
                  Use a aba "Criar Evento" para configurar seu evento com nome, descrição, preço e quantidade de ingressos.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="flex-shrink-0">
                <div className="flex items-center justify-center w-8 h-8 bg-green-100 dark:bg-green-900/50 rounded-full">
                  <svg className="w-4 h-4 text-green-600 dark:text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
              </div>
              <div>
                <h4 className="text-lg font-medium text-gray-900 dark:text-white">Gerencie Vendas</h4>
                <p className="text-gray-600 dark:text-gray-300">
                  Acompanhe as vendas em tempo real e gerencie seu evento de forma transparente através da blockchain.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Suporte</h2>
        <div className="flex items-center gap-4">
          <svg className="w-6 h-6 text-indigo-600 dark:text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
          </svg>
          <div>
            <p className="text-gray-600 dark:text-gray-300">
              Precisa de ajuda? Entre em contato:
              <a href="mailto:suporte@festia.com" className="ml-2 text-indigo-600 dark:text-indigo-400 hover:underline">
                suporte@festia.com
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
      <nav className="bg-white dark:bg-gray-800 shadow-lg border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex-shrink-0 flex items-center">
              <h1 className="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                Festia
              </h1>
            </div>
            
            <div className="flex items-center space-x-4">
              <button
                onClick={toggleDarkMode}
                className="p-2 rounded-lg text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200"
              >
                {darkMode ? (
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" 
                          d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                  </svg>
                ) : (
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" 
                          d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                  </svg>
                )}
              </button>
              <ConnectWallet />
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <div className="border-b border-gray-200 dark:border-gray-700">
            <nav className="-mb-px flex space-x-8">
              <button
                onClick={() => setActiveTab('events')}
                className={`
                  ${activeTab === 'events'
                    ? 'border-indigo-500 text-indigo-600 dark:text-indigo-400'
                    : 'border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 hover:border-gray-300'}
                  whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm
                  transition-all duration-200 ease-in-out flex items-center gap-2
                `}
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" 
                        d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                </svg>
                Eventos Disponíveis
              </button>
              
              <button
                onClick={() => setActiveTab('create')}
                className={`
                  ${activeTab === 'create'
                    ? 'border-indigo-500 text-indigo-600 dark:text-indigo-400'
                    : 'border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 hover:border-gray-300'}
                  whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm
                  transition-all duration-200 ease-in-out flex items-center gap-2
                `}
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" 
                        d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
                Criar Evento
              </button>
              
              <button
                onClick={() => setActiveTab('mytickets')}
                className={`
                  ${activeTab === 'mytickets'
                    ? 'border-indigo-500 text-indigo-600 dark:text-indigo-400'
                    : 'border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 hover:border-gray-300'}
                  whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm
                  transition-all duration-200 ease-in-out flex items-center gap-2
                `}
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" 
                        d="M15 5v2m0 4v2m0 4v2M5 5a2 2 0 00-2 2v3a2 2 0 110 4v3a2 2 0 002 2h14a2 2 0 002-2v-3a2 2 0 110-4V7a2 2 0 00-2-2H5z" />
                </svg>
                Meus Ingressos
              </button>

              <button
                onClick={() => setActiveTab('info')}
                className={`
                  ${activeTab === 'info'
                    ? 'border-indigo-500 text-indigo-600 dark:text-indigo-400'
                    : 'border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 hover:border-gray-300'}
                  whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm
                  transition-all duration-200 ease-in-out flex items-center gap-2
                `}
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" 
                        d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Como Funciona
              </button>
            </nav>
          </div>
        </div>

        <main className="bg-white dark:bg-gray-800 shadow-xl rounded-lg p-6">
          {activeTab === 'events' && <EventList />}
          {activeTab === 'create' && <CreateEvent />}
          {activeTab === 'mytickets' && <MyTickets />}
          {activeTab === 'info' && <Information />}
        </main>
      </div>

      <footer className="mt-16 bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
          <p className="text-center text-gray-500 dark:text-gray-400 text-sm">
            Festia © 2024 - Todos os direitos reservados
          </p>
        </div>
      </footer>
    </div>
  );
}

export default App;