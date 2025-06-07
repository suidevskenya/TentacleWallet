import React from 'react';
import { ArrowUpDown, ArrowDownLeft, ArrowUpRight, QrCode } from 'lucide-react';

interface ActionButtonsProps {
  onConvert: () => void;
  onReceive: () => void;
  onSend: () => void;
  onScan: () => void;
}

const ActionButtons: React.FC<ActionButtonsProps> = ({
  onConvert,
  onReceive,
  onSend,
  onScan,
}) => {
  return (
    <div className="mx-4 mb-6">
      <div className="bg-gray-800 rounded-xl p-4">
        <div className="flex justify-around">
          <button 
            className="flex flex-col items-center gap-2"
            onClick={onConvert}
          >
            <div className="w-12 h-12 bg-gray-700 rounded-xl flex items-center justify-center">
              <ArrowUpDown className="w-6 h-6 text-orange-500" />
            </div>
            <span className="text-sm text-gray-300">Convert</span>
          </button>
          
          <button 
            className="flex flex-col items-center gap-2"
            onClick={onReceive}
          >
            <div className="w-12 h-12 bg-gray-700 rounded-xl flex items-center justify-center">
              <ArrowDownLeft className="w-6 h-6 text-orange-500" />
            </div>
            <span className="text-sm text-gray-300">Receive</span>
          </button>
          
          <button 
            className="flex flex-col items-center gap-2"
            onClick={onSend}
          >
            <div className="w-12 h-12 bg-gray-700 rounded-xl flex items-center justify-center">
              <ArrowUpRight className="w-6 h-6 text-orange-500" />
            </div>
            <span className="text-sm text-gray-300">Send</span>
          </button>
          
          <button 
            className="flex flex-col items-center gap-2"
            onClick={onScan}
          >
            <div className="w-12 h-12 bg-gray-700 rounded-xl flex items-center justify-center">
              <QrCode className="w-6 h-6 text-orange-500" />
            </div>
            <span className="text-sm text-gray-300">Scan</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ActionButtons;
