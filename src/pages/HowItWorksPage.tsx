import React from 'react';
import { motion } from 'framer-motion';
import { Ticket, Shield, RefreshCw, DollarSign, Zap, HelpCircle, Wallet } from 'lucide-react';
import Button from '../components/ui/Button';
import Card from '../components/ui/Card';

const HowItWorksPage: React.FC = () => {
  // Steps data
  const steps = [
    {
      icon: <Ticket size={24} />,
      title: 'Purchase Authentic Tickets',
      description: 'Buy verified tickets directly from organizers or trusted resellers. Each ticket is minted as an NFT on the blockchain, ensuring its authenticity.',
    },
    {
      icon: <Shield size={24} />,
      title: 'Secure Storage in Your Wallet',
      description: 'Your tickets are stored securely in your digital wallet. No more paper tickets to lose or screenshots to forge.',
    },
    {
      icon: <RefreshCw size={24} />,
      title: 'Easy Transfer and Resale',
      description: 'Transfer tickets to friends or resell them on our marketplace with just a few clicks. Smart contracts ensure fair pricing and prevent scalping.',
    },
    {
      icon: <Zap size={24} />,
      title: 'Seamless Entry at Events',
      description: 'Simply show the QR code from your ticket at the venue. The blockchain verification ensures only valid tickets are accepted.',
    },
  ];

  // FAQs data
  const faqs = [
    {
      question: 'What is an NFT ticket?',
      answer: 'An NFT (Non-Fungible Token) ticket is a digital ticket that uses blockchain technology to verify ownership and authenticity. Each ticket is unique and cannot be duplicated, providing enhanced security against counterfeiting.',
    },
    {
      question: 'Do I need cryptocurrency to use NFTickets?',
      answer: 'No, we\'ve designed NFTickets to be accessible to everyone. You can purchase tickets using traditional payment methods like credit cards. The blockchain technology works behind the scenes.',
    },
    {
      question: 'How do I set up a wallet?',
      answer: 'Setting up a wallet is easy! Click on "Connect Wallet" in the header and follow the instructions. If you don\'t have a wallet yet, we\'ll guide you through creating one. Popular options include MetaMask and Coinbase Wallet.',
    },
    {
      question: 'Can I transfer my ticket to someone else?',
      answer: 'Yes, you can easily transfer your NFT ticket to another person. Go to your ticket details, click "Transfer Ticket," and enter the recipient\'s wallet address. The transfer is recorded on the blockchain for transparency.',
    },
    {
      question: 'What happens if an event is canceled?',
      answer: 'If an event is canceled, refunds are automatically processed through the smart contract. The funds will be returned to the wallet that purchased the ticket, ensuring a hassle-free refund process.',
    },
    {
      question: 'Are there fees for selling tickets?',
      answer: 'Yes, there is a small platform fee (5%) when you sell a ticket on our marketplace. This fee helps maintain the platform and ensure security for all users.',
    },
  ];

  return (
    <div className="bg-neutral-50 min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-primary to-secondary py-20 text-white">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl font-bold mb-6">How NFTickets Works</h1>
          <p className="text-xl text-white/90 max-w-2xl mx-auto mb-8">
            Our blockchain-based ticketing platform ensures security, transparency, and ease of use for all users.
          </p>
          <Button 
            variant="outline" 
            size="lg" 
            className="bg-white/10 border-white/20 text-white hover:bg-white/20"
          >
            Get Started
          </Button>
        </div>
      </section>

      {/* Steps Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-neutral-900 mb-4">Simple Steps to Use NFTickets</h2>
            <p className="text-neutral-600 max-w-2xl mx-auto">
              Our platform is designed to be intuitive and user-friendly, even if you're new to blockchain technology.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {steps.map((step, index) => (
              <motion.div 
                key={index}
                whileHover={{ y: -5 }}
                className="text-center"
              >
                <Card className="p-6 h-full flex flex-col items-center">
                  <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mb-4">
                    <div className="text-primary">{step.icon}</div>
                  </div>
                  <h3 className="text-xl font-semibold mb-3">{step.title}</h3>
                  <p className="text-neutral-600">
                    {step.description}
                  </p>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-neutral-900 mb-4">Benefits of NFT Tickets</h2>
            <p className="text-neutral-600 max-w-2xl mx-auto">
              Discover why blockchain technology is revolutionizing the ticketing industry.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-neutral-50 rounded-apple p-6">
              <h3 className="text-xl font-semibold mb-4">Enhanced Security</h3>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <div className="w-2 h-2 rounded-full bg-primary mt-2 mr-2"></div>
                  <p className="text-neutral-700">Eliminates counterfeit tickets through blockchain verification</p>
                </li>
                <li className="flex items-start">
                  <div className="w-2 h-2 rounded-full bg-primary mt-2 mr-2"></div>
                  <p className="text-neutral-700">Each ticket has a unique identifier that cannot be duplicated</p>
                </li>
                <li className="flex items-start">
                  <div className="w-2 h-2 rounded-full bg-primary mt-2 mr-2"></div>
                  <p className="text-neutral-700">Secure storage in your digital wallet</p>
                </li>
              </ul>
            </div>
            
            <div className="bg-neutral-50 rounded-apple p-6">
              <h3 className="text-xl font-semibold mb-4">Full Transparency</h3>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <div className="w-2 h-2 rounded-full bg-primary mt-2 mr-2"></div>
                  <p className="text-neutral-700">Complete ticket history viewable on the blockchain</p>
                </li>
                <li className="flex items-start">
                  <div className="w-2 h-2 rounded-full bg-primary mt-2 mr-2"></div>
                  <p className="text-neutral-700">Fair pricing with transparent fees</p>
                </li>
                <li className="flex items-start">
                  <div className="w-2 h-2 rounded-full bg-primary mt-2 mr-2"></div>
                  <p className="text-neutral-700">Verify authenticity and ownership at any time</p>
                </li>
              </ul>
            </div>
            
            <div className="bg-neutral-50 rounded-apple p-6">
              <h3 className="text-xl font-semibold mb-4">Seamless Experience</h3>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <div className="w-2 h-2 rounded-full bg-primary mt-2 mr-2"></div>
                  <p className="text-neutral-700">Easy-to-use interface, even for blockchain beginners</p>
                </li>
                <li className="flex items-start">
                  <div className="w-2 h-2 rounded-full bg-primary mt-2 mr-2"></div>
                  <p className="text-neutral-700">Quick transfers and resales without physical exchange</p>
                </li>
                <li className="flex items-start">
                  <div className="w-2 h-2 rounded-full bg-primary mt-2 mr-2"></div>
                  <p className="text-neutral-700">Automatic refunds through smart contracts if events are canceled</p>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-neutral-900 mb-4">Frequently Asked Questions</h2>
            <p className="text-neutral-600 max-w-2xl mx-auto">
              Get answers to common questions about NFTickets and blockchain ticketing.
            </p>
          </div>
          
          <div className="max-w-3xl mx-auto">
            {faqs.map((faq, index) => (
              <div key={index} className="mb-6">
                <details className="group">
                  <summary className="flex justify-between items-center cursor-pointer list-none bg-white p-5 rounded-apple shadow-sm">
                    <h3 className="text-lg font-medium text-neutral-900">{faq.question}</h3>
                    <span className="text-primary transition-transform duration-300 group-open:rotate-180">
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="6 9 12 15 18 9"></polyline>
                      </svg>
                    </span>
                  </summary>
                  <div className="bg-white px-5 py-3 rounded-b-apple">
                    <p className="text-neutral-700">{faq.answer}</p>
                  </div>
                </details>
              </div>
            ))}
          </div>
          
          <div className="text-center mt-10">
            <p className="text-neutral-600 mb-4">Still have questions?</p>
            <Button 
              variant="outline" 
              className="mx-auto"
              icon={<HelpCircle size={18} />}
            >
              Contact Support
            </Button>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-primary to-secondary text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-6">Ready to Experience the Future of Ticketing?</h2>
            <p className="text-white/80 mb-8">
              Join thousands of users who are already enjoying secure, transparent, and hassle-free event ticketing.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                variant="outline" 
                size="lg" 
                className="bg-white/10 border-white/20 text-white hover:bg-white/20"
                icon={<Wallet size={20} />}
              >
                Connect Wallet
              </Button>
              <Button 
                size="lg"
                className="bg-white text-primary hover:bg-white/90"
              >
                Explore Events
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Technology Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-neutral-900 mb-4">The Technology Behind NFTickets</h2>
            <p className="text-neutral-600 max-w-2xl mx-auto">
              Our platform leverages cutting-edge blockchain technology to provide a secure and transparent ticketing experience.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <h3 className="text-2xl font-semibold mb-4">Blockchain-Powered Security</h3>
              <p className="text-neutral-700 mb-6">
                NFTickets uses blockchain technology to create a secure, immutable record of ticket ownership. 
                Each ticket is represented as a non-fungible token (NFT) on the blockchain, ensuring that it 
                cannot be counterfeited or duplicated.
              </p>
              <h3 className="text-2xl font-semibold mb-4">Smart Contracts</h3>
              <p className="text-neutral-700 mb-6">
                Our platform utilizes smart contracts to automate ticket sales, transfers, and refunds. 
                These self-executing contracts ensure that all transactions are transparent, fair, and 
                follow predefined rules without the need for intermediaries.
              </p>
              <Button variant="outline">Learn More About Blockchain</Button>
            </div>
            <div className="bg-neutral-100 rounded-apple p-8 h-full">
              <div className="bg-white rounded-lg p-6 shadow-sm mb-6">
                <h4 className="font-semibold mb-2">NFT Ticket Example</h4>
                <div className="border border-neutral-200 rounded-lg p-4 mb-4">
                  <div className="bg-neutral-50 h-32 rounded-lg mb-3 flex items-center justify-center">
                    <Ticket size={48} className="text-neutral-300" />
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm text-neutral-500">Event:</span>
                      <span className="text-sm font-medium">Summer Music Festival</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-neutral-500">Date:</span>
                      <span className="text-sm font-medium">July 15, 2025</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-neutral-500">Token ID:</span>
                      <span className="text-sm font-mono bg-neutral-100 px-1 rounded">0x1a2b3c4d</span>
                    </div>
                  </div>
                </div>
                <p className="text-sm text-neutral-600">
                  Each NFT ticket contains metadata about the event, seat information, and a unique identifier 
                  that can be verified on the blockchain.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HowItWorksPage;