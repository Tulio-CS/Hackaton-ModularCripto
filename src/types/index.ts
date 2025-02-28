export interface Ticket {
  id: string;
  name: string;
  eventName: string;
  eventDate: string;
  venue: string;
  price: number;
  currency: string;
  imageUrl: string;
  tokenId?: string;
  isNFT: boolean;
  seller?: string;
  section?: string;
  row?: string;
  seat?: string;
}

export interface Event {
  id: string;
  name: string;
  date: string;
  venue: string;
  imageUrl: string;
  description: string;
  category: string;
  ticketsAvailable: number;
  minPrice: number;
  maxPrice: number;
  currency: string;
}

export interface WalletState {
  address: string | null;
  isConnected: boolean;
  isConnecting: boolean;
  error: string | null;
}