export const CONTRACT_ADDRESS = "0x737fFC4c896c71620C013e5E2787243a8152224e";

export const NETWORK_CONFIG = {
  chainId: "0xA4B1", // Hardhat Network chainId em hexadecimal (31337 em decimal)
  chainName: "arbitrum-one",
  nativeCurrency: {
    name: "ETH",
    symbol: "ETH",
    decimals: 18,
  },
  rpcUrls: ["https://arbitrum-mainnet.infura.io"],
  blockExplorerUrls: ["https://explorer.abritrum.io"],
};

// ABI do seu contrato EventTicketNFT
export const CONTRACT_ABI = [
  // Funções de Evento
  {
    "inputs": [
      { "internalType": "string", "name": "name", "type": "string" },
      { "internalType": "string", "name": "description", "type": "string" },
      { "internalType": "uint256", "name": "price", "type": "uint256" },
      { "internalType": "uint256", "name": "maxTickets", "type": "uint256" }
    ],
    "name": "createEvent",
    "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [{ "internalType": "uint256", "name": "eventId", "type": "uint256" }],
    "name": "purchaseTicket",
    "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }],
    "stateMutability": "payable",
    "type": "function"
  },
  {
    "inputs": [{ "internalType": "uint256", "name": "eventId", "type": "uint256" }],
    "name": "cancelEvent",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  // Funções de Visualização
  {
    "inputs": [{ "internalType": "uint256", "name": "eventId", "type": "uint256" }],
    "name": "getEventDetails",
    "outputs": [
      { "internalType": "string", "name": "name", "type": "string" },
      { "internalType": "string", "name": "description", "type": "string" },
      { "internalType": "uint256", "name": "price", "type": "uint256" },
      { "internalType": "uint256", "name": "maxTickets", "type": "uint256" },
      { "internalType": "uint256", "name": "ticketsSold", "type": "uint256" },
      { "internalType": "bool", "name": "isActive", "type": "bool" }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "getActiveEvents",
    "outputs": [{ "internalType": "uint256[]", "name": "", "type": "uint256[]" }],
    "stateMutability": "view",
    "type": "function"
  },
  // Eventos
  {
    "anonymous": false,
    "inputs": [
      { "indexed": true, "internalType": "uint256", "name": "eventId", "type": "uint256" },
      { "indexed": false, "internalType": "string", "name": "name", "type": "string" },
      { "indexed": false, "internalType": "uint256", "name": "price", "type": "uint256" },
      { "indexed": false, "internalType": "uint256", "name": "maxTickets", "type": "uint256" }
    ],
    "name": "EventCreated",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      { "indexed": true, "internalType": "uint256", "name": "eventId", "type": "uint256" },
      { "indexed": true, "internalType": "uint256", "name": "tokenId", "type": "uint256" },
      { "indexed": false, "internalType": "address", "name": "buyer", "type": "address" },
      { "indexed": false, "internalType": "uint256", "name": "price", "type": "uint256" }
    ],
    "name": "TicketPurchased",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [{ "indexed": true, "internalType": "uint256", "name": "eventId", "type": "uint256" }],
    "name": "EventCancelled",
    "type": "event"
  }
]; 