import React from 'react';
import OctopusIcon from './OctopusIcon';
import { Menu } from 'lucide-react';

interface HeaderProps {
  totalBalance: number;
  onMenuClick: () => void;
}

const Header: React.FC<HeaderProps> = ({ totalBalance, onMenuClick }) => {
  return (
    <div className="flex justify-between items-center px-4 py-6">
      <div className="flex items-center gap-3">
        <OctopusIcon className="w-8 h-8 text-orange-500" />
        <h1 className="text-2xl font-light text-gray-200">
          ${totalBalance.toFixed(2)}
        </h1>
      </div>
      <button onClick={onMenuClick}>
        <Menu className="w-6 h-6 text-orange-500" />
      </button>
    </div>
  );
};

export default Header;
