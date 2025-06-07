'use client'

import React, { useState } from 'react';
import { Eye, EyeOff, ArrowUpDown, ArrowDownLeft, ArrowUpRight, QrCode, User, Settings, Shield, CreditCard, HelpCircle, LogOut, Home, Users, MapPin } from 'lucide-react';

import OctopusIcon from './components/OctopusIcon';
import Header from './components/Header';
import HamburgerMenu from './components/HamburgerMenu';
import Accounts from './components/Accounts';
import ActionButtons from './components/ActionButtons';
import TransactionsList from './components/TransactionsList';
import BottomNavigation from './components/BottomNavigation';
import PeopleView from './components/PeopleView';

type Transaction = {
  description: string;
  date: string;
  amount: string;
  currency: string;
};

export default function CryptoWalletUI() {
  const [balanceVisible, setBalanceVisible] = useState(true);
  const [activeTab, setActiveTab] = useState('Home');
  const [menuOpen, setMenuOpen] = useState(false);
  const [currentView, setCurrentView] = useState('home');
  const [suiBalance, setSuiBalance] = useState(0);
  const [dollarBalance, setDollarBalance] = useState(0);
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
        return <PeopleView />;
      default:
        return (
          <>
            <Accounts 
              suiBalance={suiBalance} 
              dollarBalance={dollarBalance} 
              balanceVisible={balanceVisible} 
              toggleBalanceVisibility={toggleBalanceVisibility} 
            />
            <ActionButtons 
              onConvert={() => console.log('Convert clicked')}
              onReceive={() => console.log('Receive clicked')}
              onSend={() => console.log('Send clicked')}
              onScan={() => console.log('Scan clicked')}
            />
            <TransactionsList transactions={transactions} />
          </>
        );
    }
  };

  return (
    <div className="max-w-sm mx-auto bg-gray-900 min-h-screen text-white">
      <Header totalBalance={totalBalance} onMenuClick={toggleMenu} />
      <HamburgerMenu menuOpen={menuOpen} onClose={toggleMenu} menuItems={menuItems} />
      {renderContent()}
      <BottomNavigation activeTab={activeTab} onTabClick={handleTabClick} />
      <div className="h-20"></div>
    </div>
  );
}
