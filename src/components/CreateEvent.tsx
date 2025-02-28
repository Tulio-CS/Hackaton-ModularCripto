import React, { useState } from 'react';
import { useWeb3 } from '../hooks/useWeb3';
import { ethers } from 'ethers';
import { Calendar, DollarSign, Users, FileText, AlertCircle } from 'lucide-react';

export function CreateEvent() {
  const { createEvent, isConnected, error } = useWeb3();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    maxTickets: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const priceInWei = ethers.parseEther(formData.price);
      await createEvent(
        formData.name,
        formData.description,
        priceInWei.toString(),
        parseInt(formData.maxTickets)
      );
      // Limpar formulário após sucesso
      setFormData({
        name: '',
        description: '',
        price: '',
        maxTickets: ''
      });
      alert('Evento criado com sucesso!');
    } catch (err: any) {
      console.error('Erro ao criar evento:', err);
      alert(err.message || 'Erro ao criar evento');
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  if (!isConnected) {
    return (
      <div className="flex items-center justify-center min-h-[400px] bg-neutral-800/50 rounded-xl">
        <div className="text-center p-8">
          <AlertCircle className="w-12 h-12 text-primary mx-auto mb-4" />
          <p className="text-neutral-300 text-lg mb-2">Conecte sua carteira</p>
          <p className="text-neutral-400">Para criar eventos, você precisa conectar sua carteira primeiro.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto">
      <div className="bg-neutral-800/50 backdrop-blur-sm rounded-xl p-6 md:p-8">
        <h2 className="text-2xl font-bold text-white mb-6">Criar Novo Evento</h2>
        
        {error && (
          <div className="bg-red-500/10 border border-red-500/20 text-red-400 px-4 py-3 rounded-lg mb-6 flex items-center">
            <AlertCircle className="w-5 h-5 mr-2" />
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-neutral-300 mb-2 flex items-center">
              <FileText className="w-4 h-4 mr-2" />
              Nome do Evento
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 bg-neutral-700/50 border border-neutral-600 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent placeholder-neutral-400"
              placeholder="Ex: Festival de Música de Verão"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-neutral-300 mb-2 flex items-center">
              <FileText className="w-4 h-4 mr-2" />
              Descrição
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 bg-neutral-700/50 border border-neutral-600 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent placeholder-neutral-400"
              placeholder="Descreva os detalhes do seu evento..."
              rows={4}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-neutral-300 mb-2 flex items-center">
                <DollarSign className="w-4 h-4 mr-2" />
                Preço (ETH)
              </label>
              <input
                type="number"
                name="price"
                value={formData.price}
                onChange={handleChange}
                required
                step="0.001"
                min="0"
                className="w-full px-4 py-3 bg-neutral-700/50 border border-neutral-600 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent placeholder-neutral-400"
                placeholder="0.1"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-neutral-300 mb-2 flex items-center">
                <Users className="w-4 h-4 mr-2" />
                Número de Ingressos
              </label>
              <input
                type="number"
                name="maxTickets"
                value={formData.maxTickets}
                onChange={handleChange}
                required
                min="1"
                className="w-full px-4 py-3 bg-neutral-700/50 border border-neutral-600 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent placeholder-neutral-400"
                placeholder="100"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className={`
              w-full py-4 px-6 rounded-lg font-medium transition-all duration-300
              bg-white hover:bg-neutral-100
              text-neutral-900 shadow-lg hover:shadow-xl
              disabled:opacity-50 disabled:cursor-not-allowed
              flex items-center justify-center gap-2
              transform hover:scale-[1.02] active:scale-[0.98]
              border border-neutral-200
            `}
          >
            {isLoading ? (
              <>
                <svg className="animate-spin h-5 w-5 text-neutral-900" viewBox="0 0 24 24">
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  />
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  />
                </svg>
                <span>Criando Evento...</span>
              </>
            ) : (
              <>
                <Calendar className="w-5 h-5 text-neutral-900" />
                <span>Criar Evento</span>
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  );
} 