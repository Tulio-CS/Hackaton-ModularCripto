import React, { useState } from 'react';
import { Coins, Award, Calendar, Info } from 'lucide-react';

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 text-white">
      <header className="container mx-auto py-6 px-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <Coins className="h-8 w-8 text-yellow-400" />
            <h1 className="text-2xl font-bold">BetChain</h1>
          </div>
          <nav className="hidden md:flex space-x-6">
            <a href="#features" className="hover:text-yellow-400 transition-colors">Features</a>
            <a href="#how-it-works" className="hover:text-yellow-400 transition-colors">How It Works</a>
            <a href="#contract" className="hover:text-yellow-400 transition-colors">Smart Contract</a>
          </nav>
          <button className="bg-yellow-500 hover:bg-yellow-600 text-black font-bold py-2 px-4 rounded-lg transition-colors">
            Connect Wallet
          </button>
        </div>
      </header>

      <main className="container mx-auto px-4 py-12">
        <section className="text-center mb-20">
          <h2 className="text-5xl font-bold mb-6">Decentralized Betting Ecosystem</h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-10">
            A transparent, secure, and fair betting platform powered by blockchain technology.
            Create bets, place wagers, and claim winnings with no intermediaries.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <button className="bg-yellow-500 hover:bg-yellow-600 text-black font-bold py-3 px-8 rounded-lg text-lg transition-colors">
              Start Betting
            </button>
            <button className="bg-transparent border-2 border-yellow-500 text-yellow-500 hover:bg-yellow-500/10 font-bold py-3 px-8 rounded-lg text-lg transition-colors">
              Learn More
            </button>
          </div>
        </section>

        <section id="features" className="mb-20">
          <h2 className="text-3xl font-bold text-center mb-12">Platform Features</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-gray-800/50 p-6 rounded-xl border border-gray-700">
              <div className="bg-yellow-500/20 p-3 rounded-full w-fit mb-4">
                <Coins className="h-6 w-6 text-yellow-400" />
              </div>
              <h3 className="text-xl font-bold mb-2">Transparent Betting</h3>
              <p className="text-gray-300">
                All bets are recorded on the blockchain, ensuring complete transparency and fairness.
              </p>
            </div>
            <div className="bg-gray-800/50 p-6 rounded-xl border border-gray-700">
              <div className="bg-yellow-500/20 p-3 rounded-full w-fit mb-4">
                <Award className="h-6 w-6 text-yellow-400" />
              </div>
              <h3 className="text-xl font-bold mb-2">Instant Payouts</h3>
              <p className="text-gray-300">
                Claim your winnings instantly once a bet is resolved, with no delays or withdrawal limits.
              </p>
            </div>
            <div className="bg-gray-800/50 p-6 rounded-xl border border-gray-700">
              <div className="bg-yellow-500/20 p-3 rounded-full w-fit mb-4">
                <Calendar className="h-6 w-6 text-yellow-400" />
              </div>
              <h3 className="text-xl font-bold mb-2">Create Custom Bets</h3>
              <p className="text-gray-300">
                Create your own betting markets with custom outcomes and timeframes.
              </p>
            </div>
          </div>
        </section>

        <section id="how-it-works" className="mb-20">
          <h2 className="text-3xl font-bold text-center mb-12">How It Works</h2>
          <div className="grid md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="bg-yellow-500 text-black rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-4 font-bold text-xl">1</div>
              <h3 className="text-xl font-bold mb-2">Connect Wallet</h3>
              <p className="text-gray-300">Connect your Ethereum wallet to interact with the platform.</p>
            </div>
            <div className="text-center">
              <div className="bg-yellow-500 text-black rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-4 font-bold text-xl">2</div>
              <h3 className="text-xl font-bold mb-2">Create or Join Bets</h3>
              <p className="text-gray-300">Create your own betting markets or participate in existing ones.</p>
            </div>
            <div className="text-center">
              <div className="bg-yellow-500 text-black rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-4 font-bold text-xl">3</div>
              <h3 className="text-xl font-bold mb-2">Place Your Bets</h3>
              <p className="text-gray-300">Choose your outcome and place your bet with cryptocurrency.</p>
            </div>
            <div className="text-center">
              <div className="bg-yellow-500 text-black rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-4 font-bold text-xl">4</div>
              <h3 className="text-xl font-bold mb-2">Claim Rewards</h3>
              <p className="text-gray-300">After the bet is resolved, winners can claim their rewards instantly.</p>
            </div>
          </div>
        </section>

        <section id="contract" className="mb-20">
          <h2 className="text-3xl font-bold text-center mb-12">Smart Contract Details</h2>
          <div className="bg-gray-800/50 p-8 rounded-xl border border-gray-700">
            <div className="flex items-start mb-6">
              <div className="bg-yellow-500/20 p-3 rounded-full mr-4">
                <Info className="h-6 w-6 text-yellow-400" />
              </div>
              <div>
                <h3 className="text-xl font-bold mb-2">BettingEcosystem Contract</h3>
                <p className="text-gray-300 mb-4">
                  Our platform is powered by a secure, audited smart contract deployed on the Ethereum blockchain.
                </p>
              </div>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="border-b border-gray-700">
                    <th className="pb-3 pr-4">Function</th>
                    <th className="pb-3">Description</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-gray-700">
                    <td className="py-3 pr-4 font-mono text-yellow-400">createBet()</td>
                    <td className="py-3">Create a new betting market with custom parameters</td>
                  </tr>
                  <tr className="border-b border-gray-700">
                    <td className="py-3 pr-4 font-mono text-yellow-400">placeBet()</td>
                    <td className="py-3">Place a bet on a specific outcome</td>
                  </tr>
                  <tr className="border-b border-gray-700">
                    <td className="py-3 pr-4 font-mono text-yellow-400">resolveBet()</td>
                    <td className="py-3">Resolve a bet by setting the winning outcome</td>
                  </tr>
                  <tr className="border-b border-gray-700">
                    <td className="py-3 pr-4 font-mono text-yellow-400">claimRewards()</td>
                    <td className="py-3">Claim winnings after a bet is resolved</td>
                  </tr>
                  <tr>
                    <td className="py-3 pr-4 font-mono text-yellow-400">cancelBet()</td>
                    <td className="py-3">Cancel a bet and allow refunds</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-gray-900 py-8">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center space-x-2 mb-4 md:mb-0">
              <Coins className="h-6 w-6 text-yellow-400" />
              <span className="text-xl font-bold">BetChain</span>
            </div>
            <div className="text-gray-400 text-sm">
              © 2025 BetChain. All rights reserved. Use at your own risk.
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;