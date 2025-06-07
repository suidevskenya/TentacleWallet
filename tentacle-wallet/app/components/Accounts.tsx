import React from 'react';
import { Eye, EyeOff, DollarSign } from 'lucide-react';

interface AccountsProps {
  suiBalance: number;
  dollarBalance: number;
  balanceVisible: boolean;
  toggleBalanceVisibility: () => void;
}

const Accounts: React.FC<AccountsProps> = ({
  suiBalance,
  dollarBalance,
  balanceVisible,
  toggleBalanceVisibility,
}) => {
  return (
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
  );
};

export default Accounts;
