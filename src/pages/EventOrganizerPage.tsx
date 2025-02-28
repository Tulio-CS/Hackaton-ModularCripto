import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { BarChart3, Users, Calendar, DollarSign, TrendingUp, Share2 } from 'lucide-react';

interface Event {
  id: string;
  name: string;
  date: string;
  location: string;
  ticketsSold: number;
  totalTickets: number;
  revenue: number;
  status: 'active' | 'draft' | 'ended';
}

const EventOrganizerPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'overview' | 'events' | 'analytics'>('overview');

  // Dados simulados
  const events: Event[] = [
    {
      id: '1',
      name: 'Rock in Rio 2025',
      date: '2025-09-15',
      location: 'Rio de Janeiro',
      ticketsSold: 150,
      totalTickets: 1000,
      revenue: 22.5, // em ETH
      status: 'active'
    },
    {
      id: '2',
      name: 'Lollapalooza 2025',
      date: '2025-03-25',
      location: 'São Paulo',
      ticketsSold: 300,
      totalTickets: 800,
      revenue: 36.0,
      status: 'active'
    }
  ];

  const stats = {
    totalRevenue: events.reduce((acc, event) => acc + event.revenue, 0),
    totalTicketsSold: events.reduce((acc, event) => acc + event.ticketsSold, 0),
    activeEvents: events.filter(event => event.status === 'active').length,
    averageOccupancy: events.reduce((acc, event) => 
      acc + (event.ticketsSold / event.totalTickets), 0) / events.length * 100
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        {/* Cabeçalho */}
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900">Painel do Organizador</h1>
          <p className="text-gray-600">Gerencie seus eventos e acompanhe métricas em tempo real</p>
        </div>

        {/* Cards de Estatísticas */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white p-6 rounded-xl shadow-sm"
          >
            <div className="flex items-center gap-4">
              <div className="p-3 bg-purple-100 rounded-lg">
                <DollarSign className="w-6 h-6 text-purple-600" />
              </div>
              <div>
                <p className="text-gray-600">Receita Total</p>
                <p className="text-2xl font-semibold">{stats.totalRevenue} ETH</p>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-white p-6 rounded-xl shadow-sm"
          >
            <div className="flex items-center gap-4">
              <div className="p-3 bg-blue-100 rounded-lg">
                <Users className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <p className="text-gray-600">Ingressos Vendidos</p>
                <p className="text-2xl font-semibold">{stats.totalTicketsSold}</p>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white p-6 rounded-xl shadow-sm"
          >
            <div className="flex items-center gap-4">
              <div className="p-3 bg-green-100 rounded-lg">
                <Calendar className="w-6 h-6 text-green-600" />
              </div>
              <div>
                <p className="text-gray-600">Eventos Ativos</p>
                <p className="text-2xl font-semibold">{stats.activeEvents}</p>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-white p-6 rounded-xl shadow-sm"
          >
            <div className="flex items-center gap-4">
              <div className="p-3 bg-yellow-100 rounded-lg">
                <TrendingUp className="w-6 h-6 text-yellow-600" />
              </div>
              <div>
                <p className="text-gray-600">Ocupação Média</p>
                <p className="text-2xl font-semibold">{stats.averageOccupancy.toFixed(1)}%</p>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Lista de Eventos */}
        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
          <div className="p-6 border-b border-gray-200">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-semibold">Seus Eventos</h2>
              <button className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg transition-colors">
                Criar Novo Evento
              </button>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Evento
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Data
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Local
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Vendas
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Receita
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Ações
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {events.map((event) => (
                  <tr key={event.id}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">{event.name}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-500">
                        {new Date(event.date).toLocaleDateString('pt-BR')}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-500">{event.location}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">
                        {event.ticketsSold}/{event.totalTickets}
                      </div>
                      <div className="w-24 h-2 bg-gray-200 rounded-full mt-1">
                        <div 
                          className="h-full bg-purple-600 rounded-full"
                          style={{ width: `${(event.ticketsSold / event.totalTickets) * 100}%` }}
                        />
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{event.revenue} ETH</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                        event.status === 'active' 
                          ? 'bg-green-100 text-green-800'
                          : event.status === 'draft'
                          ? 'bg-gray-100 text-gray-800'
                          : 'bg-red-100 text-red-800'
                      }`}>
                        {event.status === 'active' ? 'Ativo' : 
                         event.status === 'draft' ? 'Rascunho' : 'Encerrado'}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <button className="text-purple-600 hover:text-purple-900 mr-3">
                        Editar
                      </button>
                      <button className="text-purple-600 hover:text-purple-900">
                        <Share2 className="w-4 h-4 inline" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventOrganizerPage; 