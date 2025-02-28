import React, { useState } from 'react';
import { ConnectWallet } from './components/ConnectWallet';
import { CreateEvent } from './components/CreateEvent';
import { EventList } from './components/EventList';
import { MyTickets } from './components/MyTickets';

function App() {
  const [activeTab, setActiveTab] = useState('events');

  return (
    <div className="min-h-screen bg-neutral-900">
      <nav className="bg-neutral-800 shadow-lg">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex justify-between h-16">
            <div className="flex-shrink-0 flex items-center">
              <h1 className="text-xl font-bold text-primary">Festia</h1>
            </div>
            
            <div className="flex items-center">
              <ConnectWallet />
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="mb-6">
          <div className="border-b border-gray-200">
            <nav className="-mb-px flex space-x-8">
              <button
                onClick={() => setActiveTab('events')}
                className={`
                  ${activeTab === 'events'
                    ? 'border-indigo-500 text-indigo-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}
                  whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm
                `}
              >
                Eventos Disponíveis
              </button>
              
              <button
                onClick={() => setActiveTab('create')}
                className={`
                  ${activeTab === 'create'
                    ? 'border-indigo-500 text-indigo-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}
                  whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm
                `}
              >
                Criar Evento
              </button>
              
              <button
                onClick={() => setActiveTab('mytickets')}
                className={`
                  ${activeTab === 'mytickets'
                    ? 'border-indigo-500 text-indigo-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}
                  whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm
                `}
              >
                Meus Ingressos
              </button>
            </nav>
          </div>
        </div>

        <main>
          {activeTab === 'events' && <EventList />}
          {activeTab === 'create' && <CreateEvent />}
          {activeTab === 'mytickets' && <MyTickets />}
        </main>
      </div>
    </div>
  );
}

export default App;