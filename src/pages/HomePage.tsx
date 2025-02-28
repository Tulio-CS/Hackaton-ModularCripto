import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Ticket, Calendar, Shield } from 'lucide-react';

const HomePage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <div className="container mx-auto px-4 py-20">
        <div className="text-center">
          <h1 className="text-4xl md:text-6xl font-medium text-gray-900 mb-6">
            Seus Ingressos NFT em um Só Lugar
          </h1>
          <p className="text-xl text-gray-500 mb-8 max-w-2xl mx-auto">
            Compre, venda e colecione ingressos NFT para os melhores eventos do Brasil.
            Tudo isso de forma segura e descentralizada.
          </p>
          <div className="flex gap-4 justify-center">
            <button
              onClick={() => navigate('/explore')}
              className="bg-black text-white px-8 py-3 rounded-2xl font-medium hover:bg-gray-900 transition-colors shadow-lg hover:shadow-xl"
            >
              Explorar Eventos
            </button>
            <button
              onClick={() => navigate('/how-it-works')}
              className="bg-gray-100/50 text-gray-900 px-8 py-3 rounded-2xl font-medium hover:bg-gray-200/50 transition-colors"
            >
              Como Funciona
            </button>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="bg-gray-100/50 backdrop-blur-sm py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-medium text-gray-900 text-center mb-12">
            Por que escolher NFTickets?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center p-8 bg-white/50 backdrop-blur-sm rounded-3xl shadow-sm hover:shadow-md transition-all duration-300">
              <div className="bg-black/5 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Ticket className="w-8 h-8 text-black" />
              </div>
              <h3 className="text-xl font-medium text-gray-900 mb-2">
                Ingressos Únicos
              </h3>
              <p className="text-gray-500">
                Cada ingresso é um NFT único e intransferível, garantindo sua autenticidade
                e evitando falsificações.
              </p>
            </div>
            <div className="text-center p-8 bg-white/50 backdrop-blur-sm rounded-3xl shadow-sm hover:shadow-md transition-all duration-300">
              <div className="bg-black/5 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Calendar className="w-8 h-8 text-black" />
              </div>
              <h3 className="text-xl font-medium text-gray-900 mb-2">
                Eventos Exclusivos
              </h3>
              <p className="text-gray-500">
                Acesso aos melhores eventos do país, desde shows e festivais até
                conferências e eventos esportivos.
              </p>
            </div>
            <div className="text-center p-8 bg-white/50 backdrop-blur-sm rounded-3xl shadow-sm hover:shadow-md transition-all duration-300">
              <div className="bg-black/5 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Shield className="w-8 h-8 text-black" />
              </div>
              <h3 className="text-xl font-medium text-gray-900 mb-2">
                Segurança Total
              </h3>
              <p className="text-gray-500">
                Transações seguras e transparentes através da blockchain, com smart
                contracts auditados.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-black py-20">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-medium text-white mb-6">
            Pronto para começar?
          </h2>
          <p className="text-xl text-gray-400 mb-8 max-w-2xl mx-auto">
            Conecte sua carteira e comece a explorar os melhores eventos do Brasil.
          </p>
          <button
            onClick={() => navigate('/explore')}
            className="bg-white text-black px-8 py-3 rounded-2xl font-medium hover:bg-gray-100 transition-colors shadow-lg hover:shadow-xl"
          >
            Começar Agora
          </button>
        </div>
      </div>
    </div>
  );
};

export default HomePage;