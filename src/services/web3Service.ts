import { ethers } from 'ethers';
import { CONTRACT_ADDRESS, CONTRACT_ABI, NETWORK_CONFIG } from '../config/contracts';

class Web3Service {
  private provider: ethers.BrowserProvider | null = null;
  private contract: ethers.Contract | null = null;
  private signer: ethers.JsonRpcSigner | null = null;

  async connect() {
    if (typeof window.ethereum === 'undefined') {
      throw new Error('MetaMask não está instalado');
    }

    try {
      // Solicita conexão com a carteira
      await window.ethereum.request({ method: 'eth_requestAccounts' });
      
      // Configura o provider
      this.provider = new ethers.BrowserProvider(window.ethereum);
      
      // Obtém o signer
      this.signer = await this.provider.getSigner();
      
      // Inicializa o contrato
      this.contract = new ethers.Contract(
        CONTRACT_ADDRESS,
        CONTRACT_ABI,
        this.signer
      );

      // Verifica e adiciona a rede se necessário
      await this.checkAndAddNetwork();

      return true;
    } catch (error) {
      console.error('Erro ao conectar:', error);
      throw error;
    }
  }

  private async checkAndAddNetwork() {
    try {
      await window.ethereum.request({
        method: 'wallet_switchEthereumChain',
        params: [{ chainId: NETWORK_CONFIG.chainId }],
      });
    } catch (error: any) {
      if (error.code === 4902) {
        await window.ethereum.request({
          method: 'wallet_addEthereumChain',
          params: [NETWORK_CONFIG],
        });
      } else {
        throw error;
      }
    }
  }

  // Exemplo de método para criar um novo evento
  async createEvent(name: string, symbol: string, price: string, supply: number) {
    if (!this.contract) throw new Error('Contrato não inicializado');
    
    try {
      const tx = await this.contract.createEvent(name, symbol, price, supply);
      await tx.wait();
      return tx;
    } catch (error) {
      console.error('Erro ao criar evento:', error);
      throw error;
    }
  }

  // Exemplo de método para comprar um ticket
  async buyTicket(eventId: number, quantity: number, value: string) {
    if (!this.contract) throw new Error('Contrato não inicializado');
    
    try {
      const tx = await this.contract.buyTicket(eventId, quantity, {
        value: ethers.parseEther(value)
      });
      await tx.wait();
      return tx;
    } catch (error) {
      console.error('Erro ao comprar ticket:', error);
      throw error;
    }
  }

  // Método para verificar se está conectado
  isConnected(): boolean {
    return this.provider !== null && this.signer !== null;
  }

  // Método para obter o endereço da carteira conectada
  async getAddress(): Promise<string | null> {
    if (!this.signer) return null;
    return await this.signer.getAddress();
  }
}

export const web3Service = new Web3Service(); 