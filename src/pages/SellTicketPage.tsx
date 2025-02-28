import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Tag, Info } from 'lucide-react';

interface SellTicketPageProps {
  tokenId?: string;
  eventName?: string;
}

const SellTicketPage: React.FC<SellTicketPageProps> = () => {
  const navigate = useNavigate();
  const { tokenId } = useParams<{ tokenId: string }>();
  const [price, setPrice] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // Dados simulados do ingresso
  const ticketData = {
    eventName: 'Rock in Rio 2025',
    date: '2025-09-15',
    location: 'Rio de Janeiro',
    originalPrice: 0.15,
    tokenId: tokenId || '#1234',
    imageUrl: 'https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3'
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // Aqui seria implementada a lógica de listagem do NFT no marketplace
      await new Promise(resolve => setTimeout(resolve, 2000)); // Simulando uma transação
      navigate('/dashboard');
    } catch (error) {
      console.error('Erro ao listar ingresso:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white py-8">
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto">
          {/* Cabeçalho */}
          <div className="mb-8">
            <h1 className="text-3xl font-medium text-gray-900">Vender Ingresso</h1>
            <p className="text-gray-500">
              Liste seu ingresso NFT no marketplace para revenda
            </p>
          </div>

          {/* Card do Ingresso */}
          <div className="bg-gray-100/50 backdrop-blur-sm rounded-3xl p-6 mb-8">
            <div className="flex gap-6">
              <div className="w-32 h-32 rounded-2xl overflow-hidden">
                <img
                  src={ticketData.imageUrl}
                  alt={ticketData.eventName}
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <h2 className="text-xl font-medium text-gray-900 mb-2">
                  {ticketData.eventName}
                </h2>
                <div className="text-gray-500 space-y-1">
                  <p>{new Date(ticketData.date).toLocaleDateString('pt-BR')}</p>
                  <p>{ticketData.location}</p>
                  <p>Token ID: {ticketData.tokenId}</p>
                  <p>Preço original: {ticketData.originalPrice} ETH</p>
                </div>
              </div>
            </div>
          </div>

          {/* Formulário de Venda */}
          <form onSubmit={handleSubmit}>
            <div className="bg-gray-100/50 backdrop-blur-sm rounded-3xl p-6 mb-8">
              <div className="mb-6">
                <label htmlFor="price" className="block text-gray-700 font-medium mb-2">
                  Preço de Venda (ETH)
                </label>
                <div className="relative">
                  <input
                    type="number"
                    id="price"
                    step="0.01"
                    min="0"
                    required
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    className="w-full pl-4 pr-12 py-3 rounded-2xl bg-white border-0 focus:ring-2 focus:ring-gray-200 transition-all"
                    placeholder="0.00"
                  />
                  <span className="absolute right-4 top-3 text-gray-400">ETH</span>
                </div>
              </div>

              <div className="bg-blue-50 rounded-2xl p-4 mb-6">
                <div className="flex gap-2 text-blue-600 mb-2">
                  <Info size={20} />
                  <h3 className="font-medium">Informações Importantes</h3>
                </div>
                <ul className="text-sm text-blue-600 space-y-1">
                  <li>• Taxa do marketplace: 2.5%</li>
                  <li>• O ingresso ficará bloqueado até a venda ou cancelamento</li>
                  <li>• Você pode cancelar a venda a qualquer momento</li>
                </ul>
              </div>

              <button
                type="submit"
                disabled={isLoading || !price}
                className={`
                  w-full bg-black text-white px-6 py-3 rounded-2xl
                  transition-all duration-300 flex items-center justify-center gap-2
                  ${isLoading || !price
                    ? 'opacity-50 cursor-not-allowed'
                    : 'hover:bg-gray-900 shadow-lg hover:shadow-xl'
                  }
                `}
              >
                {isLoading ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    Processando...
                  </>
                ) : (
                  <>
                    <Tag size={20} />
                    Listar para Venda
                  </>
                )}
              </button>
            </div>
          </form>

          {/* Botão Cancelar */}
          <button
            onClick={() => navigate(-1)}
            className="w-full bg-gray-100/50 text-gray-900 px-6 py-3 rounded-2xl font-medium hover:bg-gray-200/50 transition-colors"
          >
            Cancelar
          </button>
        </div>
      </div>
    </div>
  );
};

export default SellTicketPage;