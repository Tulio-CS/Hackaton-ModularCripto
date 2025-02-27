# BetChain: Blockchain Betting Ecosystem

This project contains a smart contract for a decentralized betting platform built on Ethereum blockchain technology. The contract allows users to create betting markets, place bets, and claim winnings in a transparent and trustless manner.

## Smart Contract Features

The `BettingEcosystem.sol` contract includes the following key features:

- **Create Betting Markets**: Users can create custom betting markets with multiple outcomes and specified timeframes.
- **Place Bets**: Users can place bets on specific outcomes of existing betting markets.
- **Resolve Bets**: Bet creators or platform owners can resolve bets by declaring the winning outcome.
- **Claim Rewards**: Winners can claim their rewards after a bet is resolved.
- **Cancel Bets**: Bet creators or platform owners can cancel bets, allowing participants to receive refunds.
- **Platform Fee**: A configurable platform fee is applied to each bet.

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

## Security Features

The contract includes several security features:

- **Access Control**: Functions are restricted to appropriate users (owner, bet creator).
- **State Validation**: Checks to ensure bets are in the correct state before operations.
- **Deadline Enforcement**: Betting is only allowed before deadlines, and resolution only after deadlines.
- **Fee Limitations**: Platform fees are capped at a maximum percentage.

## Deployment

To deploy this contract:

1. Compile the contract using Solidity compiler version 0.8.19 or higher.
2. Deploy to an Ethereum network (mainnet, testnet, or local development network).
3. Constructor requires a platform fee percentage in basis points (e.g., 100 = 1%).

## Usage Example

```javascript
// Deploy contract with 1% platform fee
const bettingEcosystem = await BettingEcosystem.deploy(100);

// Create a new bet with 2 outcomes and 60 minutes duration
await bettingEcosystem.createBet("Will it rain tomorrow?", 2, 60);

// Place a bet on outcome 1 (Yes)
await bettingEcosystem.placeBet(1, 1, { value: ethers.utils.parseEther("0.1") });

// After deadline passes, resolve the bet
await bettingEcosystem.resolveBet(1, 1);

// Claim rewards
await bettingEcosystem.claimRewards(1);
```

## Disclaimer

This smart contract is provided as a template and should be thoroughly audited before use in production. Users interact with the contract at their own risk.