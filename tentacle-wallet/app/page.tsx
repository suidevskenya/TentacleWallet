'use client'

import React, { useState, useEffect } from 'react';
import { 
  Eye, 
  EyeOff, 
  ArrowUpDown, 
  ArrowDownLeft, 
  ArrowUpRight, 
  QrCode,
  Home,
  Users,
  MapPin,
  DollarSign,
  Menu,
  X,
  Settings,
  HelpCircle,
  Shield,
  LogOut,
  User,
  CreditCard,
  Copy,
  RefreshCw,
  Wallet
} from 'lucide-react';
import { getFullnodeUrl, SuiClient, Ed25519Keypair, TransactionBlock } from '@mysten/sui';

// Custom Octopus Icon Component
const OctopusIcon = ({ className = "w-6 h-6" }) => (
  <svg viewBox="0 0 24 24" className={className} fill="currentColor">
    <path d="M12 2C8.5 2 6 4.5 6 8c0 1.5 0.5 3 1.5 4.5L6 14c-1 0.5-2 1.5-2 3s1 2.5 2.5 2.5S9 18.5 9 17s-0.5-2-1.5-2.5l1-1.5c0.5 0.5 1 1 1.5 1.5l-1 2c-0.5 1-0.5 2 0.5 2.5s2 0 2.5-1l1-2c0.5 0 1 0 1.5 0l1 2c0.5 1 1.5 1.5 2.5 1s1-1.5 0.5-2.5l-1-2c0.5-0.5 1-1 1.5-1.5l1 1.5c-1 0.5-1.5 1-1.5 2.5s1 2.5 2.5 2.5S20 18.5 20 17s-1-2.5-2-3l-1.5-1.5c1-1.5 1.5-3 1.5-4.5C18 4.5 15.5 2 12 2zm0 4c1 0 2 1 2 2s-1 2-2 2-2-1-2-2 1-2 2-2z"/>
  </svg>
);

// Use testnet for development, mainnet for production
const rpcUrl = getFullnodeUrl('testnet');
const client = new SuiClient({ url: rpcUrl });

export default function SuiWalletUI() {
  const [balanceVisible, setBalanceVisible] = useState(true);
  const [activeTab, setActiveTab] = useState('Home');
  const [menuOpen, setMenuOpen] = useState(false);
  const [currentView, setCurrentView] = useState('home');
  const [suiBalance, setSuiBalance] = useState(0);
  const [dollarBalance, setDollarBalance] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  
  // Wallet state
  const [keypair, setKeypair] = useState<Ed25519Keypair | null>(null);
  const [address, setAddress] = useState('');
  const [showCreateWallet, setShowCreateWallet] = useState(false);
  const [showImportWallet, setShowImportWallet] = useState(false);
  const [mnemonicInput, setMnemonicInput] = useState('');
  const [showMnemonic, setShowMnemonic] = useState(false);
  const [generatedMnemonic, setGeneratedMnemonic] = useState('');

  type Transaction = {
    description: string;
    date: string;
    amount: string;
    currency: string;
    digest?: string;
  };
  const [transactions, setTransactions] = useState<Transaction[]>([]);

  // Initialize wallet on component mount
  useEffect(() => {
    const savedKeypair = localStorage.getItem('sui_wallet_keypair');
    if (savedKeypair) {
      try {
        const keypairData = JSON.parse(savedKeypair);
        const restoredKeypair = Ed25519Keypair.fromSecretKey(new Uint8Array(keypairData));
        setKeypair(restoredKeypair);
        setAddress(restoredKeypair.getPublicKey().toSuiAddress());
        fetchBalance(restoredKeypair.getPublicKey().toSuiAddress());
      } catch (error) {
        console.error('Error restoring wallet:', error);
        localStorage.removeItem('sui_wallet_keypair');
      }
    }
  }, []);

  const createNewWallet = () => {
    try {
      const newKeypair = new Ed25519Keypair();
      const newAddress = newKeypair.getPublicKey().toSuiAddress();
      
      // Save to localStorage (in production, use more secure storage)
      localStorage.setItem('sui_wallet_keypair', JSON.stringify(Array.from(newKeypair.getSecretKey())));
      
      setKeypair(newKeypair);
      setAddress(newAddress);
      setShowCreateWallet(false);
      
      // Generate mnemonic for backup (simplified version)
      const mnemonic = generateSimpleMnemonic();
      setGeneratedMnemonic(mnemonic);
      setShowMnemonic(true);
      
      setSuccess('Wallet created successfully!');
      setTimeout(() => setSuccess(''), 3000);
      
    } catch (error) {
      setError('Failed to create wallet');
      setTimeout(() => setError(''), 3000);
    }
  };

  const generateSimpleMnemonic = () => {
    // Simplified mnemonic generation (in production, use proper BIP39)
    const words = ['apple', 'banana', 'cherry', 'date', 'elderberry', 'fig', 'grape', 'honey', 'ice', 'juice', 'kiwi', 'lemon'];
    return Array.from({length: 12}, () => words[Math.floor(Math.random() * words.length)]).join(' ');
  };

  const fetchBalance = async (walletAddress: string) => {
    if (!walletAddress) return;
    
    setLoading(true);
    try {
      const balance = await client.getBalance({
        owner: walletAddress,
      });
      
      // Convert from MIST to SUI (1 SUI = 1,000,000,000 MIST)
      const suiAmount = parseInt(balance.totalBalance) / 1_000_000_000;
      setSuiBalance(suiAmount);
      
      // Fetch transaction history
      const txHistory = await client.queryTransactionBlocks({
        filter: {
          FromOrToAddress: {
            addr: walletAddress,
          },
        },
        options: {
          showEffects: true,
          showBalanceChanges: true,
        },
        limit: 10,
      });
      
      // Process transactions
      const processedTxs = txHistory.data.map((tx) => ({
        description: tx.effects?.status?.status === 'success' ? 'Transaction Successful' : 'Transaction Failed',
        date: new Date(parseInt(tx.timestampMs || '0')).toLocaleDateString(),
        amount: tx.balanceChanges?.[0]?.amount || '0',
        currency: 'SUI',
        digest: tx.digest,
      }));
      
      setTransactions(processedTxs);
      
    } catch (error) {
      console.error('Error fetching balance:', error);
      setError('Failed to fetch balance');
      setTimeout(() => setError(''), 3000);
    } finally {
      setLoading(false);
    }
  };

  const refreshBalance = () => {
    if (address) {
      fetchBalance(address);
    }
  };

  const copyAddress = () => {
    if (address) {
      navigator.clipboard.writeText(address);
      setSuccess('Address copied to clipboard!');
      setTimeout(() => setSuccess(''), 3000);
    }
  };

  const toggleBalanceVisibility = () => {
    setBalanceVisible(!balanceVisible);
  };

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const handleTabClick = (tab: string) => {
    setActiveTab(tab);
    setCurrentView(tab.toLowerCase());
  };

  // Calculate total balance in USD (mock conversion rate)
  const mockSuiToUSD = 2.5; // Mock conversion rate
  const totalBalance = (suiBalance * mockSuiToUSD) + dollarBalance;

  const menuItems = [
    { icon: User, label: 'Profile', action: () => console.log('Profile clicked') },
    { icon: Settings, label: 'Settings', action: () => console.log('Settings clicked') },
    { icon: Shield, label: 'Security', action: () => setShowMnemonic(true) },
    { icon: CreditCard, label: 'Payment Methods', action: () => console.log('Payment Methods clicked') },
    { icon: HelpCircle, label: 'Help & Support', action: () => console.log('Help clicked') },
    { icon: LogOut, label: 'Logout', action: () => {
      localStorage.removeItem('sui_wallet_keypair');
      setKeypair(null);
      setAddress('');
      setSuiBalance(0);
      setTransactions([]);
    }},
  ];

  // If no wallet exists, show wallet creation options
  if (!keypair) {
    return (
      <div className="max-w-sm mx-auto bg-gray-900 min-h-screen text-white flex flex-col justify-center items-center p-6">
        <OctopusIcon className="w-20 h-20 text-orange-500 mb-8" />
        <h1 className="text-3xl font-light text-gray-200 mb-2">IkaWallet</h1>
        <p className="text-gray-400 text-center mb-12">Your gateway to the Sui ecosystem</p>
        
        {!showCreateWallet && !showImportWallet && (
          <div className="w-full space-y-4">
            <button
              onClick={() => setShowCreateWallet(true)}
              className="w-full bg-orange-500 hover:bg-orange-600 text-white py-4 rounded-xl font-medium transition-colors"
            >
              Create New Wallet
            </button>
            <button
              onClick={() => setShowImportWallet(true)}
              className="w-full bg-gray-700 hover:bg-gray-600 text-white py-4 rounded-xl font-medium transition-colors"
            >
              Import Existing Wallet
            </button>
          </div>
        )}

        {showCreateWallet && (
          <div className="w-full">
            <div className="bg-gray-800 rounded-xl p-6 mb-4">
              <h3 className="text-lg font-medium mb-4">Create New Wallet</h3>
              <p className="text-gray-400 text-sm mb-6">
                This will generate a new wallet with a unique address and private key.
              </p>
              <div className="flex gap-3">
                <button
                  onClick={createNewWallet}
                  className="flex-1 bg-orange-500 hover:bg-orange-600 text-white py-3 rounded-lg font-medium transition-colors"
                >
                  Generate Wallet
                </button>
                <button
                  onClick={() => setShowCreateWallet(false)}
                  className="flex-1 bg-gray-600 hover:bg-gray-500 text-white py-3 rounded-lg font-medium transition-colors"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}

        {showImportWallet && (
          <div className="w-full">
            <div className="bg-gray-800 rounded-xl p-6 mb-4">
              <h3 className="text-lg font-medium mb-4">Import Wallet</h3>
              <p className="text-gray-400 text-sm mb-4">
                Enter your mnemonic phrase to restore your wallet.
              </p>
              <textarea
                value={mnemonicInput}
                onChange={(e) => setMnemonicInput(e.target.value)}
                placeholder="Enter your 12-word mnemonic phrase..."
                className="w-full bg-gray-700 text-white p-3 rounded-lg mb-4 h-24 resize-none"
              />
              <div className="flex gap-3">
                <button
                  onClick={() => {
                    // Simplified import (in production, implement proper mnemonic restoration)
                    setError('Import functionality coming soon');
                    setTimeout(() => setError(''), 3000);
                  }}
                  className="flex-1 bg-orange-500 hover:bg-orange-600 text-white py-3 rounded-lg font-medium transition-colors"
                >
                  Import
                </button>
                <button
                  onClick={() => setShowImportWallet(false)}
                  className="flex-1 bg-gray-600 hover:bg-gray-500 text-white py-3 rounded-lg font-medium transition-colors"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}

        {error && (
          <div className="w-full bg-red-900 border border-red-700 text-red-200 p-3 rounded-lg mt-4">
            {error}
          </div>
        )}
        {success && (
          <div className="w-full bg-green-900 border border-green-700 text-green-200 p-3 rounded-lg mt-4">
            {success}
          </div>
        )}
      </div>
    );
  }

  const renderContent = () => {
    switch(currentView) {
      case 'people':
        return (
          <div className="mx-4 mb-6">
            <div className="bg-gray-800 rounded-xl p-6 text-center">
              <Users className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-200 mb-2">People</h3>
              <p className="text-gray-400">Connect with friends and family to send and receive payments</p>
            </div>
          </div>
        );
      default:
        return (
          <>
            {/* Wallet Address Section */}
            <div className="mx-4 mb-4">
              <div className="bg-gray-800 rounded-xl p-4">
                <div className="flex justify-between items-center mb-2">
                  <h3 className="text-sm font-medium text-gray-400">Wallet Address</h3>
                  <button onClick={copyAddress} className="text-orange-500 hover:text-orange-400">
                    <Copy className="w-4 h-4" />
                  </button>
                </div>
                <p className="text-xs text-gray-300 font-mono break-all">
                  {address}
                </p>
              </div>
            </div>

            {/* My Accounts Section */}
            <div className="mx-4 mb-6">
              <div className="bg-gray-800 rounded-xl p-4">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-lg font-medium italic text-gray-200">My Accounts</h2>
                  <div className="flex gap-2">
                    <button 
                      onClick={refreshBalance}
                      disabled={loading}
                      className="text-gray-400 hover:text-gray-300 disabled:opacity-50"
                    >
                      <RefreshCw className={`w-5 h-5 ${loading ? 'animate-spin' : ''}`} />
                    </button>
                    <button onClick={toggleBalanceVisibility}>
                      {balanceVisible ? (
                        <Eye className="w-5 h-5 text-gray-400" />
                      ) : (
                        <EyeOff className="w-5 h-5 text-gray-400" />
                      )}
                    </button>
                  </div>
                </div>

                {/* SUI Account */}
                <div className="flex items-center justify-between py-3 border-b border-gray-700">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center">
                      <span className="text-white font-bold text-sm">SUI</span>
                    </div>
                    <span className="font-medium text-gray-200">SUI</span>
                  </div>
                  <div className="text-right">
                    <div className="text-sm text-gray-300">
                      {balanceVisible ? `${suiBalance.toFixed(4)} SUI` : '****'}
                    </div>
                    <div className="text-xs text-gray-500">
                      {balanceVisible ? `~ $${(suiBalance * mockSuiToUSD).toFixed(2)}` : '****'}
                    </div>
                  </div>
                </div>

                {/* Dollar Account */}
                <div className="flex items-center justify-between py-3">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center">
                      <DollarSign className="w-5 h-5 text-white" />
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="font-medium text-gray-200">Dollar</span>
                      <div className="w-4 h-4 bg-gray-600 rounded-full flex items-center justify-center">
                        <span className="text-xs text-gray-400">?</span>
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm text-gray-200">
                      {balanceVisible ? `$${dollarBalance.toFixed(2)}` : '****'}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="mx-4 mb-6">
              <div className="bg-gray-800 rounded-xl p-4">
                <div className="flex justify-around">
                  <button 
                    className="flex flex-col items-center gap-2"
                    onClick={() => console.log('Convert clicked')}
                  >
                    <div className="w-12 h-12 bg-gray-700 rounded-xl flex items-center justify-center">
                      <ArrowUpDown className="w-6 h-6 text-orange-500" />
                    </div>
                    <span className="text-sm text-gray-300">Convert</span>
                  </button>
                  
                  <button 
                    className="flex flex-col items-center gap-2"
                    onClick={() => console.log('Receive clicked')}
                  >
                    <div className="w-12 h-12 bg-gray-700 rounded-xl flex items-center justify-center">
                      <ArrowDownLeft className="w-6 h-6 text-orange-500" />
                    </div>
                    <span className="text-sm text-gray-300">Receive</span>
                  </button>
                  
                  <button 
                    className="flex flex-col items-center gap-2"
                    onClick={() => console.log('Send clicked')}
                  >
                    <div className="w-12 h-12 bg-gray-700 rounded-xl flex items-center justify-center">
                      <ArrowUpRight className="w-6 h-6 text-orange-500" />
                    </div>
                    <span className="text-sm text-gray-300">Send</span>
                  </button>
                  
                  <button 
                    className="flex flex-col items-center gap-2"
                    onClick={() => console.log('Scan clicked')}
                  >
                    <div className="w-12 h-12 bg-gray-700 rounded-xl flex items-center justify-center">
                      <QrCode className="w-6 h-6 text-orange-500" />
                    </div>
                    <span className="text-sm text-gray-300">Scan</span>
                  </button>
                </div>
              </div>
            </div>

            {/* All Transactions */}
            {transactions.length > 0 ? (
              <div className="mx-4 mb-6">
                <h3 className="text-center text-orange-500 font-medium italic mb-4">
                  All transactions
                </h3>
                
                <div className="space-y-3">
                  {transactions.map((transaction, index) => (
                    <div key={index} className="bg-gray-800 rounded-xl p-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-orange-900 rounded-xl flex items-center justify-center">
                          <div className="w-6 h-6 border-2 border-orange-500 rounded transform rotate-45"></div>
                        </div>
                        <div className="flex-1">
                          <div className="font-medium text-gray-200 text-sm">
                            {transaction.description}
                          </div>
                          <div className="text-xs text-gray-500">
                            {transaction.date}
                          </div>
                          {transaction.digest && (
                            <div className="text-xs text-gray-400 font-mono">
                              {transaction.digest.substring(0, 16)}...
                            </div>
                          )}
                        </div>
                        <div className="text-right">
                          <div className="text-sm text-gray-300">{transaction.amount}</div>
                          <div className="text-xs text-gray-500">{transaction.currency}</div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <div className="mx-4 mb-6">
                <div className="bg-gray-800 rounded-xl p-8 text-center">
                  <div className="w-16 h-16 bg-gray-700 rounded-full flex items-center justify-center mx-auto mb-4">
                    <ArrowUpDown className="w-8 h-8 text-gray-400" />
                  </div>
                  <h3 className="text-lg font-medium text-gray-300 mb-2">No Transactions</h3>
                  <p className="text-gray-400 text-sm">
                    Your transaction history will appear here once you start making payments.
                  </p>
                </div>
              </div>
            )}
          </>
        );
    }
  };

  return (
    <div className="max-w-sm mx-auto bg-gray-900 min-h-screen text-white">
      {/* Header */}
      <div className="flex justify-between items-center px-4 py-6">
        <div className="flex items-center gap-3">
          <OctopusIcon className="w-8 h-8 text-orange-500" />
          <h1 className="text-2xl font-light text-gray-200">
            ${totalBalance.toFixed(2)}
          </h1>
        </div>
        <button onClick={toggleMenu}>
          <Menu className="w-6 h-6 text-orange-500" />
        </button>
      </div>

      {/* Status Messages */}
      {error && (
        <div className="mx-4 mb-4 bg-red-900 border border-red-700 text-red-200 p-3 rounded-lg text-sm">
          {error}
        </div>
      )}
      {success && (
        <div className="mx-4 mb-4 bg-green-900 border border-green-700 text-green-200 p-3 rounded-lg text-sm">
          {success}
        </div>
      )}

      {/* Mnemonic Display Modal */}
      {showMnemonic && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-gray-800 rounded-xl p-6 max-w-sm w-full">
            <h3 className="text-lg font-medium text-white mb-4">Backup Phrase</h3>
            <p className="text-gray-400 text-sm mb-4">
              Save this phrase safely. You'll need it to restore your wallet.
            </p>
            <div className="bg-gray-700 p-4 rounded-lg mb-4">
              <p className="text-white text-sm font-mono">{generatedMnemonic}</p>
            </div>
            <button
              onClick={() => setShowMnemonic(false)}
              className="w-full bg-orange-500 hover:bg-orange-600 text-white py-3 rounded-lg font-medium transition-colors"
            >
              I've Saved It
            </button>
          </div>
        </div>
      )}

      {/* Hamburger Menu Overlay */}
      {menuOpen && (
        <div className="fixed inset-0 bg-gray-950 z-50">
          <div className="flex justify-between items-center p-6 border-b border-gray-700">
            <h2 className="text-xl font-semibold text-white">Menu</h2>
            <button onClick={toggleMenu}>
              <X className="w-6 h-6 text-white" />
            </button>
          </div>
          <div className="py-4">
            {menuItems.map((item, index) => (
              <button
                key={index}
                onClick={() => {
                  item.action();
                  setMenuOpen(false);
                }}
                className="w-full flex items-center gap-4 px-6 py-4 text-left hover:bg-gray-800 transition-colors"
              >
                <item.icon className="w-6 h-6 text-white" />
                <span className="text-white text-lg">{item.label}</span>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Main Content */}
      {renderContent()}

      {/* Bottom Navigation */}
      <div className="fixed bottom-0 left-0 right-0 max-w-sm mx-auto bg-gray-900 border-t border-gray-700">
        <div className="flex justify-around py-2">
          <button 
            className={`flex flex-col items-center py-2 px-4 ${activeTab === 'Home' ? 'text-orange-500' : 'text-gray-400'}`}
            onClick={() => handleTabClick('Home')}
          >
            <Home className="w-6 h-6" />
            <span className="text-xs mt-1">Home</span>
          </button>
          
          <button 
            className={`flex flex-col items-center py-2 px-4 ${activeTab === 'People' ? 'text-orange-500' : 'text-gray-400'}`}
            onClick={() => handleTabClick('People')}
          >
            <Users className="w-6 h-6" />
            <span className="text-xs mt-1">People</span>
          </button>
          
          <button 
            className={`flex flex-col items-center py-2 px-4 ${activeTab === 'Map' ? 'text-orange-500' : 'text-gray-400'}`}
            onClick={() => handleTabClick('Map')}
          >
            <MapPin className="w-6 h-6" />
            <span className="text-xs mt-1">Map</span>
          </button>
          
          <button 
            className={`flex flex-col items-center py-2 px-4 ${activeTab === 'Earn' ? 'text-orange-500' : 'text-gray-400'}`}
            onClick={() => handleTabClick('Earn')}
          >
            <div className="w-6 h-6 border-2 border-current rounded"></div>
            <span className="text-xs mt-1">Earn</span>
          </button>
        </div>
      </div>

      {/* Spacer for fixed bottom nav */}
      <div className="h-20"></div>
    </div>
  );
}