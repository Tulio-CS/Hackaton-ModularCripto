import React, { useState, useEffect } from 'react';
import { useWeb3 } from '../hooks/useWeb3';
import { ethers } from 'ethers';

interface Event {
  id: number;
  name: string;
  description: string;
  price: string;
  maxTickets: number;
  ticketsSold: number;
  isActive: boolean;
}

export function EventList() {
  const { contract, isConnected, buyTicket } = useWeb3();
  const [events, setEvents] = useState<Event[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [purchaseLoading, setPurchaseLoading] = useState<number | null>(null);

  useEffect(() => {
    loadEvents();
  }, [contract]);

  const loadEvents = async () => {
    if (!contract) return;
    
    try {
      setIsLoading(true);
      const activeEventIds = await contract.getActiveEvents();
      
      const eventPromises = activeEventIds.map(async (id: number) => {
        const details = await contract.getEventDetails(id);
        return {
          id: id,
          name: details[0],
          description: details[1],
          price: ethers.formatEther(details[2]),
          maxTickets: details[3],
          ticketsSold: details[4],
          isActive: details[5]
        };
      });

      const eventDetails = await Promise.all(eventPromises);
      setEvents(eventDetails);
    } catch (err: any) {
      console.error('Erro ao carregar eventos:', err);
      setError('Erro ao carregar eventos. Por favor, tente novamente.');
    } finally {
      setIsLoading(false);
    }
  };

  const handlePurchase = async (eventId: number, price: string) => {
    if (!isConnected) {
      alert('Por favor, conecte sua carteira primeiro');
      return;
    }

    try {
      setPurchaseLoading(eventId);
      await buyTicket(eventId, ethers.parseEther(price));
      alert('Ingresso comprado com sucesso!');
      loadEvents(); // Recarrega a lista de eventos
    } catch (err: any) {
      console.error('Erro ao comprar ingresso:', err);
      alert(err.message || 'Erro ao comprar ingresso');
    } finally {
      setPurchaseLoading(null);
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-[200px]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-4 text-center text-red-600">
        {error}
      </div>
    );
  }

  if (events.length === 0) {
    return (
      <div className="p-4 text-center text-gray-600">
        Nenhum evento disponível no momento.
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto p-4">
      <h2 className="text-2xl font-bold mb-6">Eventos Disponíveis</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {events.map((event) => (
          <div key={event.id} className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="p-6">
              <h3 className="text-xl font-semibold mb-2">{event.name}</h3>
              <p className="text-gray-600 mb-4">{event.description}</p>
              
              <div className="space-y-2">
                <p className="text-sm text-gray-500">
                  Preço: {event.price} ETH
                </p>
                <p className="text-sm text-gray-500">
                  Ingressos: {event.ticketsSold} / {event.maxTickets}
                </p>
              </div>

              <button
                onClick={() => handlePurchase(event.id, event.price)}
                disabled={purchaseLoading === event.id || !isConnected || event.ticketsSold >= event.maxTickets}
                className="mt-4 w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {purchaseLoading === event.id
                  ? 'Comprando...'
                  : event.ticketsSold >= event.maxTickets
                  ? 'Esgotado'
                  : 'Comprar Ingresso'}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
} 