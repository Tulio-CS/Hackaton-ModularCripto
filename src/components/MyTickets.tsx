import React, { useState, useEffect } from 'react';
import { useWeb3 } from '../hooks/useWeb3';
import { ethers } from 'ethers';

interface Ticket {
  tokenId: number;
  eventId: number;
  eventName: string;
  eventDescription: string;
}

export function MyTickets() {
  const { contract, isConnected, address } = useWeb3();
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (isConnected && address) {
      loadTickets();
    }
  }, [isConnected, address, contract]);

  const loadTickets = async () => {
    if (!contract || !address) return;

    try {
      setIsLoading(true);
      // Implementar a lógica de carregar os tickets do usuário
      // Esta é uma implementação básica, você pode expandir conforme necessário
      const balance = await contract.balanceOf(address);
      const tickets = [];

      for (let i = 0; i < balance; i++) {
        const tokenId = await contract.tokenOfOwnerByIndex(address, i);
        const eventId = await contract.getTicketEvent(tokenId);
        const eventDetails = await contract.getEventDetails(eventId);

        tickets.push({
          tokenId: tokenId,
          eventId: eventId,
          eventName: eventDetails[0],
          eventDescription: eventDetails[1]
        });
      }

      setTickets(tickets);
    } catch (err: any) {
      console.error('Erro ao carregar tickets:', err);
      setError('Erro ao carregar seus ingressos. Por favor, tente novamente.');
    } finally {
      setIsLoading(false);
    }
  };

  if (!isConnected) {
    return (
      <div className="p-4 text-center">
        <p className="text-red-600">Conecte sua carteira para ver seus ingressos</p>
      </div>
    );
  }

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

  if (tickets.length === 0) {
    return (
      <div className="p-4 text-center text-gray-600">
        Você ainda não possui ingressos.
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto p-4">
      <h2 className="text-2xl font-bold mb-6">Meus Ingressos</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {tickets.map((ticket) => (
          <div key={ticket.tokenId} className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="p-6">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-xl font-semibold">{ticket.eventName}</h3>
                  <p className="text-sm text-gray-500">ID do Ingresso: #{ticket.tokenId.toString()}</p>
                </div>
                <span className="bg-green-100 text-green-800 text-xs font-medium px-2.5 py-0.5 rounded">
                  Válido
                </span>
              </div>
              
              <p className="text-gray-600 mb-4">{ticket.eventDescription}</p>
              
              <div className="mt-4 pt-4 border-t border-gray-200">
                <p className="text-sm text-gray-500">
                  ID do Evento: #{ticket.eventId.toString()}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
} 