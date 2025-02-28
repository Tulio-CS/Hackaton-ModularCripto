import React from 'react';
import { Link } from 'react-router-dom';
import { Ticket, Twitter, Instagram, Github, Mail, Shield, HelpCircle } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-neutral-900 text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center mb-4">
              <Ticket size={24} className="text-primary mr-2" />
              <h2 className="text-xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                NFTickets
              </h2>
            </div>
            <p className="text-neutral-400 mb-4">
              The future of event ticketing. Secure, transparent, and easy to use.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-neutral-400 hover:text-primary transition-colors">
                <Twitter size={20} />
              </a>
              <a href="#" className="text-neutral-400 hover:text-primary transition-colors">
                <Instagram size={20} />
              </a>
              <a href="#" className="text-neutral-400 hover:text-primary transition-colors">
                <Github size={20} />
              </a>
              <a href="#" className="text-neutral-400 hover:text-primary transition-colors">
                <Mail size={20} />
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Marketplace</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/explore" className="text-neutral-400 hover:text-primary transition-colors">
                  Explore Events
                </Link>
              </li>
              <li>
                <Link to="/my-tickets" className="text-neutral-400 hover:text-primary transition-colors">
                  My Tickets
                </Link>
              </li>
              <li>
                <Link to="/sell" className="text-neutral-400 hover:text-primary transition-colors">
                  Sell Tickets
                </Link>
              </li>
              <li>
                <Link to="/how-it-works" className="text-neutral-400 hover:text-primary transition-colors">
                  How It Works
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Resources</h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-neutral-400 hover:text-primary transition-colors">
                  Help Center
                </a>
              </li>
              <li>
                <a href="#" className="text-neutral-400 hover:text-primary transition-colors">
                  Blockchain Guide
                </a>
              </li>
              <li>
                <a href="#" className="text-neutral-400 hover:text-primary transition-colors">
                  NFT FAQ
                </a>
              </li>
              <li>
                <a href="#" className="text-neutral-400 hover:text-primary transition-colors">
                  Developer API
                </a>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Legal</h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-neutral-400 hover:text-primary transition-colors">
                  Terms of Service
                </a>
              </li>
              <li>
                <a href="#" className="text-neutral-400 hover:text-primary transition-colors">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="#" className="text-neutral-400 hover:text-primary transition-colors">
                  Cookie Policy
                </a>
              </li>
              <li>
                <a href="#" className="text-neutral-400 hover:text-primary transition-colors">
                  Refund Policy
                </a>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-neutral-800 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-neutral-500 text-sm mb-4 md:mb-0">
            &copy; {new Date().getFullYear()} NFTickets. All rights reserved.
          </p>
          <div className="flex space-x-6">
            <a href="#" className="text-neutral-500 hover:text-primary transition-colors flex items-center text-sm">
              <Shield size={16} className="mr-1" />
              Security
            </a>
            <a href="#" className="text-neutral-500 hover:text-primary transition-colors flex items-center text-sm">
              <HelpCircle size={16} className="mr-1" />
              Support
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;