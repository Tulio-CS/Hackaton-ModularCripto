import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Ticket, History, DollarSign, ChevronRight, ExternalLink } from 'lucide-react';
import { useWeb3 } from '../context/Web3Context';
import { useNavigate } from 'react-router-dom';

type Tab = 'ativos' | 'vendidos' | 'historico';

interface Transaction {
  id: string;
  type: 'compra' | 'venda';
  eventName: string;
  date: string;
  price: number;
  status: 'concluído' | 'pendente';
  hash: string;
}

const DashboardPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<Tab>('ativos');
  const { account } = useWeb3();
  const navigate = useNavigate();

  // Dados simulados
  const tickets = {
    ativos: [
      {
        id: '1',
        eventName: 'Rock in Rio 2025',
        date: '2025-09-15',
        location: 'Rio de Janeiro',
        tokenId: '#1234',
        imageUrl: 'https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3'
      },
      {
        id: '2',
        eventName: 'Lollapalooza 2025',
        date: '2025-03-25',
        location: 'São Paulo',
        tokenId: '#5678',
        imageUrl: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87'
      }
    ],
    vendidos: [
      {
        id: '3',
        eventName: 'Festival de Verão',
        date: '2024-12-20',
        location: 'Salvador',
        tokenId: '#9012',
        price: 0.15,
        buyerAddress: '0xabcd...ef12'
      }
    ]
  };

  const transactions: Transaction[] = [
    {
      id: '1',
      type: 'compra',
      eventName: 'Rock in Rio 2025',
      date: '2024-03-15',
      price: 0.15,
      status: 'concluído',
      hash: '0x1234...5678'
    },
    {
      id: '2',
      type: 'venda',
      eventName: 'Festival de Verão',
      date: '2024-03-10',
      price: 0.15,
      status: 'concluído',
      hash: '0x9876...5432'
    }
  ];

  const tabContent = {
    ativos: (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {tickets.ativos.map((ticket) => (
          <motion.div
            key={ticket.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="group bg-gray-100/50 backdrop-blur-sm rounded-3xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300"
          >
            <div className="aspect-[4/3] relative overflow-hidden">
              <img 
                src={ticket.imageUrl} 
                alt={ticket.eventName}
                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
              />
              <div className="absolute top-4 right-4">
                <span className="px-4 py-2 rounded-2xl text-sm font-medium bg-white/90 backdrop-blur-md text-black shadow-lg">
                  {ticket.tokenId}
                </span>
              </div>
            </div>
            <div className="p-6">
              <h3 className="text-xl font-medium text-gray-900 mb-2">
                {ticket.eventName}
              </h3>
              <div className="text-gray-500 space-y-1 mb-6">
                <p>{new Date(ticket.date).toLocaleDateString('pt-BR')}</p>
                <p>{ticket.location}</p>
              </div>
              <div className="space-y-3">
                <button 
                  onClick={() => navigate(`/nft/${ticket.tokenId}`, { state: { eventName: ticket.eventName } })}
                  className="w-full bg-black hover:bg-gray-900 text-white px-6 py-3 rounded-2xl transition-colors shadow-lg hover:shadow-xl"
                >
                  Visualizar NFT
                </button>
                <button 
                  onClick={() => navigate(`/sell/${ticket.tokenId}`)}
                  className="w-full bg-gray-100/50 text-gray-900 px-6 py-3 rounded-2xl font-medium hover:bg-gray-200/50 transition-colors"
                >
                  Vender Ingresso
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    ),
    vendidos: (
      <div className="space-y-4">
        {tickets.vendidos.map((ticket) => (
          <motion.div
            key={ticket.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-gray-100/50 backdrop-blur-sm rounded-2xl p-6 hover:shadow-md transition-all duration-300"
          >
            <div className="flex justify-between items-center">
              <div>
                <h3 className="text-lg font-medium text-gray-900">{ticket.eventName}</h3>
                <p className="text-gray-500">{new Date(ticket.date).toLocaleDateString('pt-BR')}</p>
                <p className="text-gray-500">Token ID: {ticket.tokenId}</p>
                <p className="text-gray-500">Comprador: {ticket.buyerAddress}</p>
              </div>
              <div className="text-right">
                <p className="text-xl font-medium text-black">{ticket.price} ETH</p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    ),
    historico: (
      <div className="space-y-4">
        {transactions.map((tx) => (
          <motion.div
            key={tx.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-gray-100/50 backdrop-blur-sm rounded-2xl p-6 hover:shadow-md transition-all duration-300"
          >
            <div className="flex justify-between items-center">
              <div>
                <div className="flex items-center gap-2">
                  <span className={`px-3 py-1 rounded-xl text-sm font-medium ${
                    tx.type === 'compra' 
                      ? 'bg-green-100 text-green-800'
                      : 'bg-blue-100 text-blue-800'
                  }`}>
                    {tx.type === 'compra' ? 'Compra' : 'Venda'}
                  </span>
                  <h3 className="text-lg font-medium text-gray-900">{tx.eventName}</h3>
                </div>
                <p className="text-gray-500">{new Date(tx.date).toLocaleDateString('pt-BR')}</p>
                <a 
                  href={`https://etherscan.io/tx/${tx.hash}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-black hover:text-gray-600 text-sm flex items-center gap-1"
                >
                  Ver transação <ExternalLink size={14} />
                </a>
              </div>
              <div className="text-right">
                <p className="text-xl font-medium text-black">{tx.price} ETH</p>
                <p className={`text-sm ${
                  tx.status === 'concluído' ? 'text-green-600' : 'text-yellow-600'
                }`}>
                  {tx.status}
                </p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    )
  };

  return (
    <div className="min-h-screen bg-white py-8">
      <div className="container mx-auto px-4">
        {/* Cabeçalho */}
        <div className="mb-8">
          <h1 className="text-3xl font-medium text-gray-900">Meus Ingressos</h1>
          <p className="text-gray-500">
            Carteira conectada: {account?.slice(0, 6)}...{account?.slice(-4)}
          </p>
        </div>

        {/* Abas */}
        <div className="flex gap-4 border-b border-gray-200/50 mb-8">
          <button
            onClick={() => setActiveTab('ativos')}
            className={`flex items-center gap-2 px-6 py-3 border-b-2 transition-colors ${
              activeTab === 'ativos'
                ? 'border-black text-black'
                : 'border-transparent text-gray-500 hover:text-gray-900'
            }`}
          >
            <Ticket size={18} />
            Ingressos Ativos
          </button>
          <button
            onClick={() => setActiveTab('vendidos')}
            className={`flex items-center gap-2 px-6 py-3 border-b-2 transition-colors ${
              activeTab === 'vendidos'
                ? 'border-black text-black'
                : 'border-transparent text-gray-500 hover:text-gray-900'
            }`}
          >
            <DollarSign size={18} />
            Ingressos Vendidos
          </button>
          <button
            onClick={() => setActiveTab('historico')}
            className={`flex items-center gap-2 px-6 py-3 border-b-2 transition-colors ${
              activeTab === 'historico'
                ? 'border-black text-black'
                : 'border-transparent text-gray-500 hover:text-gray-900'
            }`}
          >
            <History size={18} />
            Histórico
          </button>
        </div>

        {/* Conteúdo */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
          >
            {tabContent[activeTab]}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
};

export default DashboardPage; 