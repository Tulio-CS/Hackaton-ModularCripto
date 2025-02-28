import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { WalletProvider } from './context/WalletContext';
import { Web3Provider } from './context/Web3Context';
import Layout from './components/layout/Layout';
import HomePage from './pages/HomePage';
import ExplorePage from './pages/ExplorePage';
import DashboardPage from './pages/DashboardPage';
import EventOrganizerPage from './pages/EventOrganizerPage';
import EventDetailPage from './pages/EventDetailPage';
import TicketDetailPage from './pages/TicketDetailPage';
import MyTicketsPage from './pages/MyTicketsPage';
import SellTicketPage from './pages/SellTicketPage';
import HowItWorksPage from './pages/HowItWorksPage';
import NFTPage from './pages/NFTPage';

function App() {
  return (
    <Web3Provider>
      <WalletProvider>
        <Router>
          <Layout>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/explore" element={<ExplorePage />} />
              <Route path="/dashboard" element={<DashboardPage />} />
              <Route path="/organizer" element={<EventOrganizerPage />} />
              <Route path="/events/:eventId" element={<EventDetailPage />} />
              <Route path="/tickets/:ticketId" element={<TicketDetailPage />} />
              <Route path="/my-tickets" element={<MyTicketsPage />} />
              <Route path="/sell/:tokenId" element={<SellTicketPage />} />
              <Route path="/how-it-works" element={<HowItWorksPage />} />
              <Route path="/nft/:tokenId" element={<NFTPage />} />
            </Routes>
          </Layout>
        </Router>
      </WalletProvider>
    </Web3Provider>
  );
}

export default App;