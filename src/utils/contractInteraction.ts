import { ethers } from 'ethers';
import { switchToArbitrumNetwork } from './arbitrumConfig';

// ABI for the ArbitrumBettingEcosystem contract
// This is a simplified ABI with just the functions we need
const contractABI = [
  // Read functions
  "function bets(uint256) view returns (uint256 id, string description, uint256 totalBetAmount, uint256 outcomeCount, uint256 deadline, bool resolved, uint256 winningOutcome, address creator, bool cancelled)",
  "function getUserBets(address) view returns (uint256[])",
  "function getUserBetAmount(uint256 betId, uint256 outcomeId, address user) view returns (uint256)",
  "function getContractInfo() view returns (string version, string network)",
  "function platformFeePercent() view returns (uint256)",
  
  // Write functions
  "function createBet(string description, uint256 outcomeCount, uint256 durationInMinutes)",
  "function placeBet(uint256 betId, uint256 outcomeId) payable",
  "function resolveBet(uint256 betId, uint256 winningOutcome)",
  "function cancelBet(uint256 betId)",
  "function claimRewards(uint256 betId)",
  
  // Events
  "event BetCreated(uint256 indexed betId, string description, uint256 outcomeCount, uint256 deadline)",
  "event BetPlaced(uint256 indexed betId, uint256 outcomeId, address bettor, uint256 amount)",
  "event BetResolved(uint256 indexed betId, uint256 winningOutcome)",
  "event BetCancelled(uint256 indexed betId)",
  "event Withdrawal(address indexed user, uint256 amount)"
];

// Contract addresses for different networks
const CONTRACT_ADDRESSES = {
  mainnet: '0x...', // Replace with actual contract address when deployed to Arbitrum mainnet
  testnet: '0x...', // Replace with actual contract address when deployed to Arbitrum testnet
  sepolia: '0x...'  // Replace with actual contract address when deployed to Arbitrum Sepolia
};

export class ArbitrumBettingService {
  private provider: ethers.providers.Web3Provider | null = null;
  private signer: ethers.Signer | null = null;
  private contract: ethers.Contract | null = null;
  private networkType: 'mainnet' | 'testnet' | 'sepolia';
  
  constructor(networkType: 'mainnet' | 'testnet' | 'sepolia' = 'testnet') {
    this.networkType = networkType;
  }
  
  // Initialize the connection to the wallet and contract
  async connect() {
    if (!window.ethereum) {
      throw new Error('MetaMask is not installed');
    }
    
    // Switch to Arbitrum network
    await switchToArbitrumNetwork(this.networkType);
    
    // Connect to the provider
    this.provider = new ethers.providers.Web3Provider(window.ethereum);
    
    // Request account access
    await this.provider.send('eth_requestAccounts', []);
    
    // Get the signer
    this.signer = this.provider.getSigner();
    
    // Create contract instance
    const contractAddress = CONTRACT_ADDRESSES[this.networkType];
    this.contract = new ethers.Contract(contractAddress, contractABI, this.signer);
    
    return {
      address: await this.signer.getAddress(),
      network: this.networkType
    };
  }
  
  // Check if connected to wallet
  isConnected(): boolean {
    return this.signer !== null && this.contract !== null;
  }
  
  // Get current account address
  async getAccount(): Promise<string> {
    if (!this.signer) {
      throw new Error('Not connected to wallet');
    }
    return await this.signer.getAddress();
  }
  
  // Create a new bet
  async createBet(description: string, outcomeCount: number, durationInMinutes: number) {
    if (!this.contract) {
      throw new Error('Contract not initialized');
    }
    
    const tx = await this.contract.createBet(description, outcomeCount, durationInMinutes);
    return await tx.wait();
  }
  
  // Place a bet on a specific outcome
  async placeBet(betId: number, outcomeId: number, amount: string) {
    if (!this.contract) {
      throw new Error('Contract not initialized');
    }
    
    const tx = await this.contract.placeBet(betId, outcomeId, {
      value: ethers.utils.parseEther(amount)
    });
    return await tx.wait();
  }
  
  // Resolve a bet by setting the winning outcome
  async resolveBet(betId: number, winningOutcome: number) {
    if (!this.contract) {
      throw new Error('Contract not initialized');
    }
    
    const tx = await this.contract.resolveBet(betId, winningOutcome);
    return await tx.wait();
  }
  
  // Cancel a bet
  async cancelBet(betId: number) {
    if (!this.contract) {
      throw new Error('Contract not initialized');
    }
    
    const tx = await this.contract.cancelBet(betId);
    return await tx.wait();
  }
  
  // Claim rewards for a bet
  async claimRewards(betId: number) {
    if (!this.contract) {
      throw new Error('Contract not initialized');
    }
    
    const tx = await this.contract.claimRewards(betId);
    return await tx.wait();
  }
  
  // Get all bets created by the user
  async getUserBets() {
    if (!this.contract || !this.signer) {
      throw new Error('Contract not initialized');
    }
    
    const address = await this.signer.getAddress();
    const betIds = await this.contract.getUserBets(address);
    
    // Get details for each bet
    const bets = await Promise.all(
      betIds.map(async (id: number) => {
        const bet = await this.contract!.bets(id);
        return {
          id: bet.id.toNumber(),
          description: bet.description,
          totalBetAmount: ethers.utils.formatEther(bet.totalBetAmount),
          outcomeCount: bet.outcomeCount.toNumber(),
          deadline: new Date(bet.deadline.toNumber() * 1000),
          resolved: bet.resolved,
          winningOutcome: bet.winningOutcome.toNumber(),
          creator: bet.creator,
          cancelled: bet.cancelled
        };
      })
    );
    
    return bets;
  }
  
  // Get contract information
  async getContractInfo() {
    if (!this.contract) {
      throw new Error('Contract not initialized');
    }
    
    return await this.contract.getContractInfo();
  }
  
  // Get platform fee percentage
  async getPlatformFee() {
    if (!this.contract) {
      throw new Error('Contract not initialized');
    }
    
    const fee = await this.contract.platformFeePercent();
    return fee.toNumber() / 100; // Convert from basis points to percentage
  }
  
  // Listen for events
  listenForEvents(eventName: string, callback: (event: any) => void) {
    if (!this.contract) {
      throw new Error('Contract not initialized');
    }
    
    this.contract.on(eventName, callback);
    
    // Return a function to remove the listener
    return () => {
      this.contract?.removeListener(eventName, callback);
    };
  }
}

// Export a default instance
export default new ArbitrumBettingService('testnet');