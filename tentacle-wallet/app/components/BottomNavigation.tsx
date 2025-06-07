import React from 'react';
import { Home, Users, MapPin } from 'lucide-react';

interface BottomNavigationProps {
  activeTab: string;
  onTabClick: (tab: string) => void;
}

const BottomNavigation: React.FC<BottomNavigationProps> = ({ activeTab, onTabClick }) => {
  return (
    <div className="fixed bottom-0 left-0 right-0 max-w-sm mx-auto bg-gray-900 border-t border-gray-700">
      <div className="flex justify-around py-2">
        <button 
          className={`flex flex-col items-center py-2 px-4 ${activeTab === 'Home' ? 'text-orange-500' : 'text-gray-400'}`}
          onClick={() => onTabClick('Home')}
        >
          <Home className="w-6 h-6" />
          <span className="text-xs mt-1">Home</span>
        </button>
        
        <button 
          className={`flex flex-col items-center py-2 px-4 ${activeTab === 'People' ? 'text-orange-500' : 'text-gray-400'}`}
          onClick={() => onTabClick('People')}
        >
          <Users className="w-6 h-6" />
          <span className="text-xs mt-1">People</span>
        </button>
        
        <button 
          className={`flex flex-col items-center py-2 px-4 ${activeTab === 'Map' ? 'text-orange-500' : 'text-gray-400'}`}
          onClick={() => onTabClick('Map')}
        >
          <MapPin className="w-6 h-6" />
          <span className="text-xs mt-1">Map</span>
        </button>
        
        <button 
          className={`flex flex-col items-center py-2 px-4 ${activeTab === 'Earn' ? 'text-orange-500' : 'text-gray-400'}`}
          onClick={() => onTabClick('Earn')}
        >
          <div className="w-6 h-6 border-2 border-current rounded"></div>
          <span className="text-xs mt-1">Earn</span>
        </button>
      </div>
    </div>
  );
};

export default BottomNavigation;
