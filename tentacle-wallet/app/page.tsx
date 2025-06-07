'use client'

import React, { useState } from 'react';
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
  CreditCard
} from 'lucide-react';

// Custom Octopus Icon Component
const OctopusIcon = ({ className = "w-6 h-6" }) => (
  <svg viewBox="0 0 24 24" className={className} fill="currentColor">
    <path d="M12 2C8.5 2 6 4.5 6 8c0 1.5 0.5 3 1.5 4.5L6 14c-1 0.5-2 1.5-2 3s1 2.5 2.5 2.5S9 18.5 9 17s-0.5-2-1.5-2.5l1-1.5c0.5 0.5 1 1 1.5 1.5l-1 2c-0.5 1-0.5 2 0.5 2.5s2 0 2.5-1l1-2c0.5 0 1 0 1.5 0l1 2c0.5 1 1.5 1.5 2.5 1s1-1.5 0.5-2.5l-1-2c0.5-0.5 1-1 1.5-1.5l1 1.5c-1 0.5-1.5 1-1.5 2.5s1 2.5 2.5 2.5S20 18.5 20 17s-1-2.5-2-3l-1.5-1.5c1-1.5 1.5-3 1.5-4.5C18 4.5 15.5 2 12 2zm0 4c1 0 2 1 2 2s-1 2-2 2-2-1-2-2 1-2 2-2z"/>
  </svg>
);

export default function CryptoWalletUI() {
  const [balanceVisible, setBalanceVisible] = useState(true);
  const [activeTab, setActiveTab] = useState('Home');
  const [menuOpen, setMenuOpen] = useState(false);
  const [currentView, setCurrentView] = useState('home');
  const [suiBalance, setSuiBalance] = useState(0);
  const [dollarBalance, setDollarBalance] = useState(0);
  type Transaction = {
    description: string;
    date: string;
    amount: string;
    currency: string;
  };
  const [transactions, setTransactions] = useState<Transaction[]>([]);

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

  // Calculate total balance in USD
  const totalBalance = suiBalance + dollarBalance;

  const menuItems = [
    { icon: User, label: 'Profile', action: () => console.log('Profile clicked') },
    { icon: Settings, label: 'Settings', action: () => console.log('Settings clicked') },
    { icon: Shield, label: 'Security', action: () => console.log('Security clicked') },
    { icon: CreditCard, label: 'Payment Methods', action: () => console.log('Payment Methods clicked') },
    { icon: HelpCircle, label: 'Help & Support', action: () => console.log('Help clicked') },
    { icon: LogOut, label: 'Logout', action: () => console.log('Logout clicked') },
  ];

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
            {/* My Accounts Section */}
            <div className="mx-4 mb-6">
              <div className="bg-gray-800 rounded-xl p-4">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-lg font-medium italic text-gray-200">My Accounts</h2>
                  <button onClick={toggleBalanceVisibility}>
                    {balanceVisible ? (
                      <Eye className="w-5 h-5 text-gray-400" />
                    ) : (
                      <EyeOff className="w-5 h-5 text-gray-400" />
                    )}
                  </button>
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
                    <div className="text-sm text-gray-300">{suiBalance.toFixed(2)} SUI</div>
                    <div className="text-xs text-gray-500">
                      {balanceVisible ? `~ ${suiBalance.toFixed(2)}` : '****'}
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
                      {balanceVisible ? `${dollarBalance.toFixed(2)}` : '****'}
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