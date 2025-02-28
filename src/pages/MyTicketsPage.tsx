import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Calendar, MapPin, Search, Filter, X, Ticket as TicketIcon } from 'lucide-react';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';

const MyTicketsPage: React.FC = () => {
  // Mock tickets data
  const tickets = [
    {
      id: '1',
      name: 'Summer Music Festival - VIP Pass',
      eventName: 'Summer Music Festival',
      eventDate: '2025-07-15T14:00:00',
      venue: 'Central Park, New York',
      section: 'VIP',
      row: 'A',
      seat: '12',
      price: 299.99,
      currency: 'USD',
      imageUrl: 'https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1740&q=80',
      tokenId: '0x1a2b3c4d5e6f7g8h9i0j',
      isNFT: true,
    },
    {
      id: '2',
      name: 'Tech Conference 2025 - Full Access',
      eventName: 'Tech Conference 2025',
      eventDate: '2025-09-22T09:00:00',
      venue: 'Moscone Center, San Francisco',
      section: 'Main Hall',
      row: '-',
      seat: '-',
      price: 149.99,
      currency: 'USD',
      imageUrl: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1740&q=80',
      tokenId: '0x2b3c4d5e6f7g8h9i0j1k',
      isNFT: true,
    },
    {
      id: '3',
      name: 'NBA Finals Game 7 - Lower Level',
      eventName: 'NBA Finals Game 7',
      eventDate: '2025-06-18T19:30:00',
      venue: 'Madison Square Garden, New York',
      section: '112',
      row: '15',
      seat: '7',
      price: 299.99,
      currency: 'USD',
      imageUrl: 'https://images.unsplash.com/photo-1504450758481-7338eba7524a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1740&q=80',
      tokenId: '0x3c4d5e6f7g8h9i0j1k2l',
      isNFT: true,
    },
  ];

  // Filter states
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState<'all' | 'upcoming' | 'past'>('upcoming');

  // Filter tickets
  const filteredTickets = tickets.filter(ticket => {
    const matchesSearch = ticket.eventName.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          ticket.venue.toLowerCase().includes(searchTerm.toLowerCase());
    
    const eventDate = new Date(ticket.eventDate);
    const now = new Date();
    
    const isPast = eventDate < now;
    const isUpcoming = eventDate >= now;
    
    const matchesFilter = 
      (filterType === 'all') || 
      (filterType === 'upcoming' && isUpcoming) || 
      (filterType === 'past' && isPast);
    
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="bg-neutral-50 min-h-screen">
      {/* Header */}
      <div className="bg-primary text-white py-12">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl font-bold mb-4">My Tickets</h1>
          <p className="text-white/80 max-w-2xl">
            View and manage all your NFT tickets in one place.
          </p>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="container mx-auto px-4 py-6 -mt-6 relative z-10">
        <div className="bg-white rounded-apple shadow-apple p-4">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-grow">
              <Search size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-neutral-400" />
              <input
                type="text"
                placeholder="Search tickets by event or venue..."
                className="w-full pl-10 pr-4 py-2 border border-neutral-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="flex gap-2">
              <Button 
                variant={filterType === 'all' ? 'primary' : 'outline'} 
                size="sm"
                onClick={() => setFilterType('all')}
              >
                All
              </Button>
              <Button 
                variant={filterType === 'upcoming' ? 'primary' : 'outline'} 
                size="sm"
                onClick={() => setFilterType('upcoming')}
              >
                Upcoming
              </Button>
              <Button 
                variant={filterType === 'past' ? 'primary' : 'outline'} 
                size="sm"
                onClick={() => setFilterType('past')}
              >
                Past
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Results */}
      <div className="container mx-auto px-4 py-8">
        {/* Active filters */}
        {searchTerm && (
          <div className="mb-6 flex flex-wrap items-center gap-2">
            <span className="text-neutral-500">Search:</span>
            <div className="bg-neutral-100 px-3 py-1 rounded-full text-sm flex items-center">
              {searchTerm}
              <button onClick={() => setSearchTerm('')} className="ml-2 text-neutral-500 hover:text-neutral-700">
                <X size={14} />
              </button>
            </div>
          </div>
        )}

        {/* Results count */}
        <div className="mb-6">
          <p className="text-neutral-600">
            Showing {filteredTickets.length} {filteredTickets.length === 1 ? 'ticket' : 'tickets'}
          </p>
        </div>

        {/* Tickets grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredTickets.map((ticket) => (
            <Card key={ticket.id} interactive className="h-full">
              <Link to={`/tickets/${ticket.id}`}>
                <div className="relative h-48 overflow-hidden rounded-t-apple">
                  <img 
                    src={ticket.imageUrl} 
                    alt={ticket.eventName} 
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-medium text-neutral-800 flex items-center">
                    <TicketIcon size={12} className="mr-1" />
                    {ticket.section}
                  </div>
                  {ticket.isNFT && (
                    <div className="absolute top-3 right-3 bg-primary/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-medium text-white">
                      NFT
                    </div>
                  )}
                </div>
                <div className="p-5">
                  <h3 className="text-lg font-semibold text-neutral-900 mb-2">{ticket.name}</h3>
                  <div className="flex items-center text-neutral-600 text-sm mb-2">
                    <Calendar size={16} className="mr-1" />
                    {new Date(ticket.eventDate).toLocaleDateString('en-US', { 
                      month: 'long', 
                      day: 'numeric', 
                      year: 'numeric' 
                    })}
                  </div>
                  <div className="flex items-center text-neutral-600 text-sm mb-4">
                    <MapPin size={16} className="mr-1" />
                    {ticket.venue}
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-primary font-semibold">
                      ${ticket.price.toFixed(2)}
                    </span>
                    <Button size="sm">View Ticket</Button>
                  </div>
                </div>
              </Link>
            </Card>
          ))}
        </div>

        {/* No results */}
        {filteredTickets.length === 0 && (
          <div className="text-center py-12">
            <div className="bg-neutral-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <TicketIcon size={24} className="text-neutral-400" />
            </div>
            <h3 className="text-xl font-semibold mb-2">No tickets found</h3>
            <p className="text-neutral-600 mb-6">
              {searchTerm 
                ? "We couldn't find any tickets matching your search." 
                : filterType === 'upcoming' 
                  ? "You don't have any upcoming events." 
                  : filterType === 'past' 
                    ? "You don't have any past events." 
                    : "You don't have any tickets yet."}
            </p>
            {searchTerm && (
              <Button 
                variant="outline" 
                onClick={() => setSearchTerm('')}
              >
                Clear Search
              </Button>
            )}
            {!searchTerm && (
              <Link to="/explore">
                <Button>Explore Events</Button>
              </Link>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default MyTicketsPage;