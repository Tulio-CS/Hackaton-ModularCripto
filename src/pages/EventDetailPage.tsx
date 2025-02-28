import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Calendar, MapPin, Clock, Info, Share2, Heart, ArrowLeft, Ticket as TicketIcon } from 'lucide-react';
import Button from '../components/ui/Button';
import Card from '../components/ui/Card';

const EventDetailPage: React.FC = () => {
  const { eventId } = useParams<{ eventId: string }>();
  const [selectedSection, setSelectedSection] = useState<string | null>(null);
  
  // Mock event data
  const event = {
    id: eventId,
    name: 'Summer Music Festival',
    date: '2025-07-15T14:00:00',
    endDate: '2025-07-15T23:00:00',
    venue: 'Central Park, New York',
    imageUrl: 'https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1740&q=80',
    category: 'Music',
    description: 'Join us for the biggest summer music festival of 2025! Featuring top artists from around the world, food vendors, and an unforgettable experience in the heart of New York City.',
    organizer: 'NYC Events Co.',
    ticketsAvailable: 245,
    minPrice: 79.99,
    maxPrice: 299.99,
    currency: 'USD',
    sections: [
      { id: 'vip', name: 'VIP', price: 299.99, available: 25 },
      { id: 'premium', name: 'Premium', price: 199.99, available: 78 },
      { id: 'general', name: 'General Admission', price: 79.99, available: 142 },
    ],
    artists: [
      'The Weekend Warriors',
      'Electric Sound Machine',
      'Melody Masters',
      'Rhythm Collective',
    ],
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
      {/* Event Header */}
      <div className="relative h-80 md:h-96 bg-neutral-900">
        <img 
          src={event.imageUrl} 
          alt={event.name} 
          className="w-full h-full object-cover opacity-70"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-neutral-900 to-transparent"></div>
        <div className="absolute bottom-0 left-0 right-0 p-6 md:p-10">
          <div className="container mx-auto">
            <Link to="/explore" className="inline-flex items-center text-white/80 hover:text-white mb-4">
              <ArrowLeft size={16} className="mr-1" />
              Back to Events
            </Link>
            <div className="flex flex-col md:flex-row md:items-end justify-between">
              <div>
                <div className="bg-primary/90 text-white text-xs font-medium px-3 py-1 rounded-full inline-block mb-3">
                  {event.category}
                </div>
                <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">{event.name}</h1>
                <div className="flex flex-col md:flex-row md:items-center text-white/80 gap-y-1 md:gap-x-4">
                  <div className="flex items-center">
                    <Calendar size={16} className="mr-1" />
                    {formatDate(event.date)}
                  </div>
                  <div className="flex items-center">
                    <Clock size={16} className="mr-1" />
                    {formatTime(event.date)} - {formatTime(event.endDate)}
                  </div>
                  <div className="flex items-center">
                    <MapPin size={16} className="mr-1" />
                    {event.venue}
                  </div>
                </div>
              </div>
              <div className="flex gap-2 mt-4 md:mt-0">
                <Button 
                  variant="ghost" 
                  className="bg-white/10 hover:bg-white/20 text-white"
                  icon={<Heart size={18} />}
                >
                  Save
                </Button>
                <Button 
                  variant="ghost" 
                  className="bg-white/10 hover:bg-white/20 text-white"
                  icon={<Share2 size={18} />}
                >
                  Share
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Event Content */}
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Event Details */}
          <div className="lg:col-span-2">
            <Card className="mb-8 p-6">
              <h2 className="text-xl font-semibold mb-4">About This Event</h2>
              <p className="text-neutral-700 mb-6">
                {event.description}
              </p>
              
              <h3 className="text-lg font-medium mb-3">Featured Artists</h3>
              <ul className="mb-6 grid grid-cols-1 md:grid-cols-2 gap-2">
                {event.artists.map((artist, index) => (
                  <li key={index} className="flex items-center">
                    <div className="w-2 h-2 rounded-full bg-primary mr-2"></div>
                    {artist}
                  </li>
                ))}
              </ul>
              
              <h3 className="text-lg font-medium mb-3">Event Details</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex items-start">
                  <Calendar size={20} className="mr-2 text-neutral-500 mt-0.5" />
                  <div>
                    <p className="font-medium">Date and Time</p>
                    <p className="text-neutral-600">{formatDate(event.date)}</p>
                    <p className="text-neutral-600">{formatTime(event.date)} - {formatTime(event.endDate)}</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <MapPin size={20} className="mr-2 text-neutral-500 mt-0.5" />
                  <div>
                    <p className="font-medium">Location</p>
                    <p className="text-neutral-600">{event.venue}</p>
                    <a href="#" className="text-primary text-sm hover:underline">View on map</a>
                  </div>
                </div>
                <div className="flex items-start">
                  <Info size={20} className="mr-2 text-neutral-500 mt-0.5" />
                  <div>
                    <p className="font-medium">Organizer</p>
                    <p className="text-neutral-600">{event.organizer}</p>
                    <a href="#" className="text-primary text-sm hover:underline">View organizer profile</a>
                  </div>
                </div>
                <div className="flex items-start">
                  <TicketIcon size={20} className="mr-2 text-neutral-500 mt-0.5" />
                  <div>
                    <p className="font-medium">Tickets</p>
                    <p className="text-neutral-600">{event.ticketsAvailable} tickets available</p>
                    <p className="text-neutral-600">From ${event.minPrice} to ${event.maxPrice}</p>
                  </div>
                </div>
              </div>
            </Card>

            <Card className="p-6">
              <h2 className="text-xl font-semibold mb-4">Venue Information</h2>
              <div className="bg-neutral-100 h-64 rounded-lg mb-4 flex items-center justify-center">
                <p className="text-neutral-500">Map will be displayed here</p>
              </div>
              <h3 className="text-lg font-medium mb-2">Central Park, New York</h3>
              <p className="text-neutral-600 mb-4">
                The Great Lawn, Central Park<br />
                New York, NY 10024
              </p>
              <div className="flex flex-col sm:flex-row gap-3">
                <Button variant="outline" size="sm">Get Directions</Button>
                <Button variant="outline" size="sm">View Venue Details</Button>
              </div>
            </Card>
          </div>

          {/* Ticket Selection */}
          <div className="lg:col-span-1">
            <Card className="sticky top-24 p-6">
              <h2 className="text-xl font-semibold mb-4">Get Tickets</h2>
              
              <div className="mb-6">
                <p className="text-neutral-600 mb-2">Select ticket type:</p>
                {event.sections.map((section) => (
                  <div 
                    key={section.id}
                    className={`border rounded-lg p-4 mb-3 cursor-pointer transition-colors ${
                      selectedSection === section.id 
                        ? 'border-primary bg-primary/5' 
                        : 'border-neutral-200 hover:border-neutral-300'
                    }`}
                    onClick={() => setSelectedSection(section.id)}
                  >
                    <div className="flex justify-between items-center">
                      <div>
                        <h3 className="font-medium">{section.name}</h3>
                        <p className="text-sm text-neutral-600">{section.available} tickets left</p>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold text-lg">${section.price}</p>
                        <p className="text-xs text-neutral-500">per ticket</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="mb-6">
                <div className="flex justify-between items-center mb-2">
                  <label htmlFor="quantity" className="text-neutral-600">Quantity:</label>
                  <select 
                    id="quantity" 
                    className="border border-neutral-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
                    disabled={!selectedSection}
                  >
                    {[1, 2, 3, 4, 5, 6, 7, 8].map((num) => (
                      <option key={num} value={num}>{num}</option>
                    ))}
                  </select>
                </div>
              </div>
              
              <div className="border-t border-neutral-200 pt-4 mb-6">
                <div className="flex justify-between mb-2">
                  <span className="text-neutral-600">Subtotal</span>
                  <span className="font-medium">
                    {selectedSection 
                      ? `$${(event.sections.find(s => s.id === selectedSection)?.price || 0).toFixed(2)}`
                      : '$0.00'
                    }
                  </span>
                </div>
                <div className="flex justify-between mb-2">
                  <span className="text-neutral-600">Service Fee</span>
                  <span className="font-medium">
                    {selectedSection 
                      ? `$${(event.sections.find(s => s.id === selectedSection)?.price || 0 * 0.1).toFixed(2)}`
                      : '$0.00'
                    }
                  </span>
                </div>
                <div className="flex justify-between font-semibold text-lg mt-4">
                  <span>Total</span>
                  <span>
                    {selectedSection 
                      ? `$${(event.sections.find(s => s.id === selectedSection)?.price || 0 * 1.1).toFixed(2)}`
                      : '$0.00'
                    }
                  </span>
                </div>
              </div>
              
              <Button 
                fullWidth 
                size="lg"
                disabled={!selectedSection}
              >
                Purchase Tickets
              </Button>
              
              <p className="text-xs text-neutral-500 text-center mt-4">
                By purchasing tickets, you agree to our Terms of Service and Privacy Policy.
              </p>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventDetailPage;