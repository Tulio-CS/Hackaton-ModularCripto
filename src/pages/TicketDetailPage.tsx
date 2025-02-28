import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Calendar, MapPin, Clock, ArrowLeft, QrCode, Download, Share2, Ticket as TicketIcon } from 'lucide-react';
import Button from '../components/ui/Button';
import Card from '../components/ui/Card';

const TicketDetailPage: React.FC = () => {
  const { ticketId } = useParams<{ ticketId: string }>();
  const [showQR, setShowQR] = useState(false);
  
  // Mock ticket data
  const ticket = {
    id: ticketId,
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
    purchaseDate: '2025-05-10T09:23:45',
  };

  // Format date and time
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      weekday: 'long',
      month: 'long', 
      day: 'numeric', 
      year: 'numeric' 
    });
  };

  const formatTime = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleTimeString('en-US', { 
      hour: 'numeric', 
      minute: '2-digit',
      hour12: true 
    });
  };

  return (
    <div className="bg-neutral-50 min-h-screen pb-16">
      {/* Ticket Header */}
      <div className="bg-gradient-to-r from-primary to-secondary py-12">
        <div className="container mx-auto px-4">
          <Link to="/my-tickets" className="inline-flex items-center text-white/80 hover:text-white mb-4">
            <ArrowLeft size={16} className="mr-1" />
            Back to My Tickets
          </Link>
          <h1 className="text-3xl font-bold text-white mb-2">{ticket.name}</h1>
          <p className="text-white/80">
            Token ID: {ticket.tokenId}
          </p>
        </div>
      </div>

      {/* Ticket Content */}
      <div className="container mx-auto px-4 -mt-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Ticket Card */}
          <div className="lg:col-span-2">
            <Card className="overflow-hidden">
              <div className="relative h-48 md:h-64 overflow-hidden">
                <img 
                  src={ticket.imageUrl} 
                  alt={ticket.eventName} 
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <div className="flex flex-col md:flex-row md:items-end justify-between">
                    <div>
                      <h2 className="text-2xl font-bold text-white mb-2">{ticket.eventName}</h2>
                      <div className="flex flex-col md:flex-row md:items-center text-white/80 gap-y-1 md:gap-x-4">
                        <div className="flex items-center">
                          <Calendar size={16} className="mr-1" />
                          {formatDate(ticket.eventDate)}
                        </div>
                        <div className="flex items-center">
                          <Clock size={16} className="mr-1" />
                          {formatTime(ticket.eventDate)}
                        </div>
                        <div className="flex items-center">
                          <MapPin size={16} className="mr-1" />
                          {ticket.venue}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="p-6">
                <div className="flex flex-col md:flex-row justify-between mb-6">
                  <div>
                    <h3 className="text-lg font-semibold mb-4">Ticket Information</h3>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <p className="text-neutral-500 text-sm">Section</p>
                        <p className="font-medium">{ticket.section}</p>
                      </div>
                      <div>
                        <p className="text-neutral-500 text-sm">Row</p>
                        <p className="font-medium">{ticket.row}</p>
                      </div>
                      <div>
                        <p className="text-neutral-500 text-sm">Seat</p>
                        <p className="font-medium">{ticket.seat}</p>
                      </div>
                      <div>
                        <p className="text-neutral-500 text-sm">Price</p>
                        <p className="font-medium">${ticket.price.toFixed(2)}</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="mt-6 md:mt-0 flex flex-col items-center justify-center">
                    <Button 
                      variant="outline" 
                      className="mb-3 w-full md:w-auto"
                      onClick={() => setShowQR(!showQR)}
                      icon={<QrCode size={18} />}
                    >
                      {showQR ? 'Hide QR Code' : 'Show QR Code'}
                    </Button>
                    <div className="flex gap-2 w-full md:w-auto">
                      <Button 
                        variant="outline" 
                        className="flex-1"
                        icon={<Download size={18} />}
                      >
                        Download
                      </Button>
                      <Button 
                        variant="outline" 
                        className="flex-1"
                        icon={<Share2 size={18} />}
                      >
                        Share
                      </Button>
                    </div>
                  </div>
                </div>
                
                {/* QR Code */}
                {showQR && (
                  <motion.div 
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="border-t border-neutral-200 pt-6"
                  >
                    <div className="flex flex-col items-center">
                      <div className="bg-white p-4 rounded-lg shadow-sm mb-4">
                        <div className="w-48 h-48 bg-neutral-100 flex items-center justify-center">
                          <p className="text-neutral-500">QR Code will be displayed here</p>
                        </div>
                      </div>
                      <p className="text-sm text-neutral-500 text-center max-w-md">
                        Present this QR code at the venue entrance for admission. 
                        For security reasons, please only show this when requested by venue staff.
                      </p>
                    </div>
                  </motion.div>
                )}
                
                {/* NFT Information */}
                <div className="border-t border-neutral-200 pt-6 mt-6">
                  <h3 className="text-lg font-semibold mb-4">NFT Details</h3>
                  <div className="bg-neutral-50 rounded-lg p-4 mb-4">
                    <div className="flex items-start">
                      <div className="bg-primary/10 p-2 rounded-full mr-3">
                        <TicketIcon size={20} className="text-primary" />
                      </div>
                      <div>
                        <p className="font-medium">NFT Ticket</p>
                        <p className="text-sm text-neutral-600 mb-2">
                          This ticket is stored as an NFT on the blockchain, ensuring its authenticity and ownership.
                        </p>
                        <div className="flex flex-wrap gap-2">
                          <div className="bg-neutral-100 px-3 py-1 rounded-full text-xs">
                            Token ID: {ticket.tokenId.substring(0, 8)}...
                          </div>
                          <div className="bg-neutral-100 px-3 py-1 rounded-full text-xs">
                            Purchased: {new Date(ticket.purchaseDate).toLocaleDateString()}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <Button variant="outline" size="sm">View on Blockchain</Button>
                    <Button variant="outline" size="sm">Transfer Ticket</Button>
                    <Link to={`/sell?ticketId=${ticket.id}`}>
                      <Button size="sm">Sell Ticket</Button>
                    </Link>
                  </div>
                </div>
              </div>
            </Card>
          </div>
          
          {/* Event Information */}
          <div className="lg:col-span-1">
            <Card className="p-6 sticky top-24">
              <h3 className="text-lg font-semibold mb-4">Event Information</h3>
              <div className="mb-4">
                <img 
                  src={ticket.imageUrl} 
                  alt={ticket.eventName} 
                  className="w-full h-40 object-cover rounded-lg mb-4"
                />
                <h4 className="font-medium text-lg">{ticket.eventName}</h4>
                <div className="flex items-center text-neutral-600 text-sm mt-2">
                  <Calendar size={16} className="mr-1" />
                  {formatDate(ticket.eventDate)}
                </div>
                <div className="flex items-center text-neutral-600 text-sm mt-1">
                  <Clock size={16} className="mr-1" />
                  {formatTime(ticket.eventDate)}
                </div>
                <div className="flex items-center text-neutral-600 text-sm mt-1">
                  <MapPin size={16} className="mr-1" />
                  {ticket.venue}
                </div>
              </div>
              
              <div className="border-t border-neutral-200 pt-4 mt-4">
                <h4 className="font-medium mb-2">Venue Information</h4>
                <p className="text-neutral-600 text-sm mb-4">
                  The Great Lawn, Central Park<br />
                  New York, NY 10024
                </p>
                <Button variant="outline" size="sm" fullWidth className="mb-2">
                  Get Directions
                </Button>
                <Button variant="outline" size="sm" fullWidth>
                  View Event Details
                </Button>
              </div>
              
              <div className="border-t border-neutral-200 pt-4 mt-4">
                <h4 className="font-medium mb-2">Need Help?</h4>
                <p className="text-neutral-600 text-sm mb-4">
                  If you have any questions or issues with your ticket, please contact our support team.
                </p>
                <Button variant="outline" size="sm" fullWidth>
                  Contact Support
                </Button>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TicketDetailPage;