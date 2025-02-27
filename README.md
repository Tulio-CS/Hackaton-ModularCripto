# BetChain: Arbitrum Blockchain Betting Ecosystem

This project contains a smart contract for a decentralized betting platform built on the Arbitrum network. The contract allows users to create betting markets, place bets, and claim winnings in a transparent and trustless manner with lower gas fees and faster transactions than Ethereum mainnet.

## Smart Contract Features

The `ArbitrumBettingEcosystem.sol` contract includes the following key features:

- **Create Betting Markets**: Users can create custom betting markets with multiple outcomes and specified timeframes.
- **Place Bets**: Users can place bets on specific outcomes of existing betting markets.
- **Resolve Bets**: Bet creators or platform owners can resolve bets by declaring the winning outcome.
- **Claim Rewards**: Winners can claim their rewards after a bet is resolved.
- **Cancel Bets**: Bet creators or platform owners can cancel bets, allowing participants to receive refunds.
- **Platform Fee**: A configurable platform fee is applied to each bet.
- **Arbitrum Optimizations**: Gas-optimized code for the Arbitrum Layer 2 network.

## Why Arbitrum?

Arbitrum offers several advantages for a betting platform:

1. **Lower Gas Fees**: Significantly reduced transaction costs compared to Ethereum mainnet.
2. **Faster Transactions**: Quicker confirmation times for a better user experience.
3. **Ethereum Security**: Inherits the security guarantees of Ethereum while improving scalability.
4. **EVM Compatibility**: Fully compatible with Ethereum tools and wallets.

## Contract Structure

### Key Data Structures

- **Bet**: Contains information about a betting market, including description, deadline, and status.
- **BetOption**: Represents a specific outcome within a bet, tracking the total amount bet on that outcome and individual user bets.

### Main Functions

- `createBet(string description, uint256 outcomeCount, uint256 durationInMinutes)`: Creates a new betting market.
- `placeBet(uint256 betId, uint256 outcomeId)`: Places a bet on a specific outcome.
- `resolveBet(uint256 betId, uint256 winningOutcome)`: Resolves a bet by setting the winning outcome.
- `claimRewards(uint256 betId)`: Claims winnings or refunds for a bet.
- `cancelBet(uint256 betId)`: Cancels a bet and allows refunds.
- `getContractInfo()`: Returns version and network information.

## Security Features

The contract includes several security features:

- **Access Control**: Functions are restricted to appropriate users (owner, bet creator).
- **State Validation**: Checks to ensure bets are in the correct state before operations.
- **Deadline Enforcement**: Betting is only allowed before deadlines, and resolution only after deadlines.
- **Fee Limitations**: Platform fees are capped at a maximum percentage.

## Deployment

To deploy this contract:

1. Compile the contract using Solidity compiler version 0.8.19 or higher.
2. Deploy to the Arbitrum network (mainnet or testnet).
3. Constructor requires a platform fee percentage in basis points (e.g., 100 = 1%).

## Frontend Integration

The project includes TypeScript utilities for interacting with the contract:

- `arbitrumConfig.ts`: Configuration for connecting to Arbitrum networks
- `contractInteraction.ts`: Service for interacting with the smart contract
- `ConnectWallet.tsx`: Component for connecting to MetaMask and switching to Arbitrum

## Usage Example

```javascript
// Import the service
import arbitrumService from './utils/contractInteraction';

// Connect to wallet and Arbitrum network
await arbitrumService.connect();

// Create a new bet with 2 outcomes and 60 minutes duration
await arbitrumService.createBet("Will it rain tomorrow?", 2, 60);

// Place a bet on outcome 1 (Yes) with 0.1 ETH
await arbitrumService.placeBet(1, 1, "0.1");

// After deadline passes, resolve the bet
await arbitrumService.resolveBet(1, 1);

// Claim rewards
await arbitrumService.claimRewards(1);
```

## Disclaimer

This smart contract is provided as a template and should be thoroughly audited before use in production. Users interact with the contract at their own risk.