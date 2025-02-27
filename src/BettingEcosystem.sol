// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

/**
 * @title BettingEcosystem
 * @dev A smart contract for a decentralized betting platform
 */
contract BettingEcosystem {
    address public owner;
    uint256 public platformFeePercent; // Fee in basis points (1% = 100)
    uint256 public constant MAX_FEE = 1000; // Maximum fee: 10%
    
    struct Bet {
        uint256 id;
        string description;
        uint256 totalBetAmount;
        uint256 outcomeCount;
        uint256 deadline;
        bool resolved;
        uint256 winningOutcome;
        address creator;
        bool cancelled;
    }
    
    struct BetOption {
        uint256 betId;
        uint256 outcomeId;
        uint256 totalAmount;
        mapping(address => uint256) bets;
    }
    
    mapping(uint256 => Bet) public bets;
    mapping(uint256 => mapping(uint256 => BetOption)) public betOptions;
    mapping(address => uint256[]) public userBets;
    
    uint256 public nextBetId = 1;
    
    event BetCreated(uint256 indexed betId, string description, uint256 outcomeCount, uint256 deadline, address creator);
    event BetPlaced(uint256 indexed betId, uint256 outcomeId, address bettor, uint256 amount);
    event BetResolved(uint256 indexed betId, uint256 winningOutcome);
    event BetCancelled(uint256 indexed betId);
    event Withdrawal(address indexed user, uint256 amount);
    event FeeUpdated(uint256 newFee);
    
    modifier onlyOwner() {
        require(msg.sender == owner, "Only owner can call this function");
        _;
    }
    
    modifier betExists(uint256 betId) {
        require(betId < nextBetId, "Bet does not exist");
        _;
    }
    
    modifier betNotResolved(uint256 betId) {
        require(!bets[betId].resolved, "Bet already resolved");
        _;
    }
    
    modifier betNotCancelled(uint256 betId) {
        require(!bets[betId].cancelled, "Bet is cancelled");
        _;
    }
    
    modifier beforeDeadline(uint256 betId) {
        require(block.timestamp < bets[betId].deadline, "Bet deadline has passed");
        _;
    }
    
    modifier afterDeadline(uint256 betId) {
        require(block.timestamp >= bets[betId].deadline, "Bet deadline has not passed yet");
        _;
    }
    
    constructor(uint256 _platformFeePercent) {
        require(_platformFeePercent <= MAX_FEE, "Fee too high");
        owner = msg.sender;
        platformFeePercent = _platformFeePercent;
    }
    
    /**
     * @dev Create a new bet
     * @param description Description of the bet
     * @param outcomeCount Number of possible outcomes
     * @param durationInMinutes Duration of the bet in minutes
     */
    function createBet(string memory description, uint256 outcomeCount, uint256 durationInMinutes) external {
        require(outcomeCount >= 2, "At least 2 outcomes required");
        require(durationInMinutes > 0, "Duration must be positive");
        
        uint256 betId = nextBetId++;
        uint256 deadline = block.timestamp + (durationInMinutes * 1 minutes);
        
        Bet storage newBet = bets[betId];
        newBet.id = betId;
        newBet.description = description;
        newBet.outcomeCount = outcomeCount;
        newBet.deadline = deadline;
        newBet.creator = msg.sender;
        
        userBets[msg.sender].push(betId);
        
        emit BetCreated(betId, description, outcomeCount, deadline, msg.sender);
    }
    
    /**
     * @dev Place a bet on a specific outcome
     * @param betId ID of the bet
     * @param outcomeId ID of the outcome to bet on
     */
    function placeBet(uint256 betId, uint256 outcomeId) external payable 
        betExists(betId) 
        betNotResolved(betId) 
        betNotCancelled(betId)
        beforeDeadline(betId)
    {
        require(msg.value > 0, "Bet amount must be positive");
        require(outcomeId < bets[betId].outcomeCount, "Invalid outcome ID");
        
        BetOption storage option = betOptions[betId][outcomeId];
        
        if (option.betId == 0) {
            option.betId = betId;
            option.outcomeId = outcomeId;
        }
        
        option.bets[msg.sender] += msg.value;
        option.totalAmount += msg.value;
        
        bets[betId].totalBetAmount += msg.value;
        
        // Add to user's bet list if this is their first bet on this bet
        bool alreadyBet = false;
        for (uint256 i = 0; i < userBets[msg.sender].length; i++) {
            if (userBets[msg.sender][i] == betId) {
                alreadyBet = true;
                break;
            }
        }
        
        if (!alreadyBet) {
            userBets[msg.sender].push(betId);
        }
        
        emit BetPlaced(betId, outcomeId, msg.sender, msg.value);
    }
    
    /**
     * @dev Resolve a bet by setting the winning outcome
     * @param betId ID of the bet
     * @param winningOutcome ID of the winning outcome
     */
    function resolveBet(uint256 betId, uint256 winningOutcome) external 
        betExists(betId) 
        betNotResolved(betId) 
        betNotCancelled(betId)
        afterDeadline(betId)
    {
        Bet storage bet = bets[betId];
        
        require(msg.sender == bet.creator || msg.sender == owner, "Only bet creator or owner can resolve");
        require(winningOutcome < bet.outcomeCount, "Invalid winning outcome");
        
        bet.resolved = true;
        bet.winningOutcome = winningOutcome;
        
        emit BetResolved(betId, winningOutcome);
    }
    
    /**
     * @dev Cancel a bet and allow refunds
     * @param betId ID of the bet to cancel
     */
    function cancelBet(uint256 betId) external 
        betExists(betId) 
        betNotResolved(betId) 
        betNotCancelled(betId)
    {
        Bet storage bet = bets[betId];
        
        require(msg.sender == bet.creator || msg.sender == owner, "Only bet creator or owner can cancel");
        
        bet.cancelled = true;
        
        emit BetCancelled(betId);
    }
    
    /**
     * @dev Claim winnings or refunds for a bet
     * @param betId ID of the bet
     */
    function claimRewards(uint256 betId) external betExists(betId) {
        Bet storage bet = bets[betId];
        
        uint256 amountToWithdraw = 0;
        
        if (bet.cancelled) {
            // Refund all bets if cancelled
            for (uint256 i = 0; i < bet.outcomeCount; i++) {
                BetOption storage option = betOptions[betId][i];
                uint256 betAmount = option.bets[msg.sender];
                
                if (betAmount > 0) {
                    option.bets[msg.sender] = 0;
                    amountToWithdraw += betAmount;
                }
            }
        } else if (bet.resolved) {
            // Calculate winnings if bet is resolved
            BetOption storage winningOption = betOptions[betId][bet.winningOutcome];
            uint256 betAmount = winningOption.bets[msg.sender];
            
            if (betAmount > 0) {
                winningOption.bets[msg.sender] = 0;
                
                // Calculate the proportion of the total pot that the user won
                uint256 totalWinningAmount = winningOption.totalAmount;
                uint256 totalBetAmount = bet.totalBetAmount;
                
                if (totalWinningAmount > 0) {
                    // Calculate platform fee
                    uint256 platformFee = (totalBetAmount * platformFeePercent) / 10000;
                    uint256 remainingPot = totalBetAmount - platformFee;
                    
                    // Calculate user's share of the pot
                    amountToWithdraw = (betAmount * remainingPot) / totalWinningAmount;
                }
            }
        } else {
            revert("Bet not resolved or cancelled yet");
        }
        
        require(amountToWithdraw > 0, "No rewards to claim");
        
        // Transfer the rewards
        (bool success, ) = payable(msg.sender).call{value: amountToWithdraw}("");
        require(success, "Transfer failed");
        
        emit Withdrawal(msg.sender, amountToWithdraw);
    }
    
    /**
     * @dev Get user's bet amount on a specific outcome
     * @param betId ID of the bet
     * @param outcomeId ID of the outcome
     * @param user Address of the user
     * @return Amount bet by the user on the outcome
     */
    function getUserBetAmount(uint256 betId, uint256 outcomeId, address user) external view 
        betExists(betId) 
        returns (uint256) 
    {
        return betOptions[betId][outcomeId].bets[user];
    }
    
    /**
     * @dev Get all bets created by a user
     * @param user Address of the user
     * @return Array of bet IDs
     */
    function getUserBets(address user) external view returns (uint256[] memory) {
        return userBets[user];
    }
    
    /**
     * @dev Update the platform fee percentage
     * @param newFeePercent New fee percentage in basis points
     */
    function updatePlatformFee(uint256 newFeePercent) external onlyOwner {
        require(newFeePercent <= MAX_FEE, "Fee too high");
        platformFeePercent = newFeePercent;
        emit FeeUpdated(newFeePercent);
    }
    
    /**
     * @dev Withdraw platform fees
     */
    function withdrawPlatformFees() external onlyOwner {
        uint256 balance = address(this).balance;
        require(balance > 0, "No fees to withdraw");
        
        (bool success, ) = payable(owner).call{value: balance}("");
        require(success, "Transfer failed");
        
        emit Withdrawal(owner, balance);
    }
    
    /**
     * @dev Transfer ownership of the contract
     * @param newOwner Address of the new owner
     */
    function transferOwnership(address newOwner) external onlyOwner {
        require(newOwner != address(0), "New owner cannot be zero address");
        owner = newOwner;
    }
}