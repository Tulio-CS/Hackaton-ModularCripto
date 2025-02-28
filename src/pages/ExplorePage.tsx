import React, { useState } from 'react';
import { Search, Ticket, Tag } from 'lucide-react';

type FilterType = 'all' | 'upcoming' | 'today' | 'marketplace';

const ExplorePage: React.FC = () => {
  const [selectedFilter, setSelectedFilter] = useState<FilterType>('all');
  const [searchQuery, setSearchQuery] = useState('');

  // Eventos oficiais
  const events = [
    {
      id: '1',
      name: 'Rock in Rio 2025',
      date: '2025-09-15',
      location: 'Rio de Janeiro',
      price: 0.15,
      imageUrl: 'https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3',
      type: 'official'
    },
    {
      id: '2',
      name: 'Lollapalooza 2025',
      date: '2025-03-25',
      location: 'São Paulo',
      price: 0.12,
      imageUrl: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87',
      type: 'official'
    },
    {
      id: '3',
      name: 'Festival de Verão 2024',
      date: '2024-12-20',
      location: 'Salvador',
      price: 0.08,
      imageUrl: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819',
      type: 'official'
    }
  ];

  // Ingressos sendo revendidos (P2P)
  const resaleTickets = [
    {
      id: 'resale-1',
      name: 'Rock in Rio 2025',
      date: '2025-09-15',
      location: 'Rio de Janeiro',
      price: 0.18,
      originalPrice: 0.15,
      imageUrl: 'https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3',
      seller: '0x742d35Cc6634C0532925a3b844Bc454e4438f44e',
      type: 'resale',
      tokenId: '#1234'
    },
    {
      id: 'resale-2',
      name: 'Lollapalooza 2025',
      date: '2025-03-25',
      location: 'São Paulo',
      price: 0.14,
      originalPrice: 0.12,
      imageUrl: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87',
      seller: '0x123...789',
      type: 'resale',
      tokenId: '#5678'
    }
  ];

  const allItems = [...events, ...resaleTickets];

  const filteredItems = allItems.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         item.location.toLowerCase().includes(searchQuery.toLowerCase());

    if (!matchesSearch) return false;

    if (selectedFilter === 'marketplace') return item.type === 'resale';
    if (selectedFilter === 'all') return true;
    if (selectedFilter === 'upcoming') return new Date(item.date) > new Date();
    if (selectedFilter === 'today') {
      const eventDate = new Date(item.date);
      const today = new Date();
      return eventDate.toDateString() === today.toDateString();
    }
    return true;
  });

  return (
    <div className="min-h-screen bg-white">
      {/* Header com efeito de vidro */}
      <div className="sticky top-0 z-50 backdrop-blur-xl bg-white/75 border-b border-gray-200/50">
        <div className="container mx-auto px-4 py-6">
          <h1 className="text-3xl font-medium text-gray-900 mb-6">Explorar Eventos</h1>
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Buscar eventos..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 rounded-2xl bg-gray-100/50 border-0 focus:ring-2 focus:ring-gray-200 focus:bg-white transition-all"
                />
                <Search className="absolute left-3 top-3.5 text-gray-400 w-5 h-5" />
              </div>
            </div>
            <div className="flex gap-2 overflow-x-auto pb-2 md:pb-0">
              <button
                onClick={() => setSelectedFilter('all')}
                className={`px-6 py-3 rounded-2xl transition-all whitespace-nowrap ${
                  selectedFilter === 'all'
                    ? 'bg-black text-white shadow-lg'
                    : 'bg-gray-100/50 text-gray-700 hover:bg-gray-200/50'
                }`}
              >
                <span className="flex items-center gap-2">
                  <Ticket size={18} />
                  Todos
                </span>
              </button>
              <button
                onClick={() => setSelectedFilter('marketplace')}
                className={`px-6 py-3 rounded-2xl transition-all whitespace-nowrap ${
                  selectedFilter === 'marketplace'
                    ? 'bg-black text-white shadow-lg'
                    : 'bg-gray-100/50 text-gray-700 hover:bg-gray-200/50'
                }`}
              >
                <span className="flex items-center gap-2">
                  <Tag size={18} />
                  Marketplace P2P
                </span>
              </button>
              <button
                onClick={() => setSelectedFilter('upcoming')}
                className={`px-6 py-3 rounded-2xl transition-all whitespace-nowrap ${
                  selectedFilter === 'upcoming'
                    ? 'bg-black text-white shadow-lg'
                    : 'bg-gray-100/50 text-gray-700 hover:bg-gray-200/50'
                }`}
              >
                Próximos
              </button>
              <button
                onClick={() => setSelectedFilter('today')}
                className={`px-6 py-3 rounded-2xl transition-all whitespace-nowrap ${
                  selectedFilter === 'today'
                    ? 'bg-black text-white shadow-lg'
                    : 'bg-gray-100/50 text-gray-700 hover:bg-gray-200/50'
                }`}
              >
                Hoje
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Lista de Eventos */}
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredItems.map((item) => (
            <div
              key={item.id}
              className="group bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100"
            >
              <div className="aspect-[4/3] relative overflow-hidden">
                <img
                  src={item.imageUrl}
                  alt={item.name}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
                <div className="absolute top-4 right-4 flex flex-col gap-2">
                  {item.type === 'resale' && (
                    <span className="px-4 py-2 rounded-2xl text-sm font-medium bg-black/80 backdrop-blur-md text-white shadow-lg">
                      Revenda P2P
                    </span>
                  )}
                  <span className="px-4 py-2 rounded-2xl text-sm font-medium bg-white/90 backdrop-blur-md text-black shadow-lg">
                    {item.price} ETH
                    {item.type === 'resale' && (
                      <span className="text-xs text-gray-500 block">
                        Original: {(item as any).originalPrice} ETH
                      </span>
                    )}
                  </span>
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-medium text-gray-900 mb-2">
                  {item.name}
                </h3>
                <div className="text-gray-500 space-y-1 mb-6">
                  <p>{new Date(item.date).toLocaleDateString('pt-BR')}</p>
                  <p>{item.location}</p>
                  {item.type === 'resale' && (
                    <p className="text-sm">
                      Vendedor: {(item as any).seller.slice(0, 6)}...{(item as any).seller.slice(-4)}
                    </p>
                  )}
                </div>
                <button className="w-full bg-black hover:bg-gray-900 text-white px-6 py-3 rounded-2xl transition-colors shadow-lg hover:shadow-xl">
                  {item.type === 'resale' ? 'Comprar Ingresso' : 'Ver Detalhes'}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ExplorePage;