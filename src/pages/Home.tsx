import { motion } from 'framer-motion';
import { useWeb3 } from '../context/Web3Context';
import { Wallet } from 'lucide-react';

const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 }
};

export default function Home() {
  const { connectWallet, isConnected, account } = useWeb3();

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black text-white">
      <nav className="flex justify-between items-center p-6">
        <h1 className="text-2xl font-bold">NFTickets</h1>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={connectWallet}
          className="flex items-center gap-2 bg-purple-600 hover:bg-purple-700 px-4 py-2 rounded-lg"
        >
          <Wallet size={20} />
          {isConnected ? 
            `${account?.slice(0, 6)}...${account?.slice(-4)}` : 
            'Conectar Carteira'}
        </motion.button>
      </nav>

      <main className="container mx-auto px-6 py-12">
        <motion.section
          initial="hidden"
          animate="visible"
          variants={fadeIn}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-5xl font-bold mb-6">Seus Eventos Favoritos em NFTs</h2>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Compre, venda e troque ingressos com segurança usando tecnologia blockchain
          </p>
        </motion.section>

        <motion.section
          initial="hidden"
          animate="visible"
          variants={fadeIn}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {/* Eventos em Destaque - Placeholder */}
          {[1, 2, 3].map((i) => (
            <motion.div
              key={i}
              whileHover={{ scale: 1.03 }}
              className="bg-gray-800 rounded-xl p-6 hover:shadow-xl transition-shadow"
            >
              <div className="aspect-video bg-gray-700 rounded-lg mb-4"></div>
              <h3 className="text-xl font-semibold mb-2">Evento em Destaque {i}</h3>
              <p className="text-gray-400 mb-4">Data • Local</p>
              <button className="w-full bg-purple-600 hover:bg-purple-700 py-2 rounded-lg transition-colors">
                Ver Detalhes
              </button>
            </motion.div>
          ))}
        </motion.section>
      </main>
    </div>
  );
} 