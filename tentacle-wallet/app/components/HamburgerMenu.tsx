import React from 'react';
import { X } from 'lucide-react';

interface MenuItem {
  icon: React.ElementType;
  label: string;
  action: () => void;
}

interface HamburgerMenuProps {
  menuOpen: boolean;
  onClose: () => void;
  menuItems: MenuItem[];
}

const HamburgerMenu: React.FC<HamburgerMenuProps> = ({ menuOpen, onClose, menuItems }) => {
  if (!menuOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray-950 z-50">
      <div className="flex justify-between items-center p-6 border-b border-gray-700">
        <h2 className="text-xl font-semibold text-white">Menu</h2>
        <button onClick={onClose}>
          <X className="w-6 h-6 text-white" />
        </button>
      </div>
      <div className="py-4">
        {menuItems.map((item, index) => (
          <button
            key={index}
            onClick={() => {
              item.action();
              onClose();
            }}
            className="w-full flex items-center gap-4 px-6 py-4 text-left hover:bg-gray-800 transition-colors"
          >
            <item.icon className="w-6 h-6 text-white" />
            <span className="text-white text-lg">{item.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default HamburgerMenu;
