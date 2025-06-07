import React from 'react';
import mockTransactions, { Transaction } from '../data/mockTransactions';

interface TransactionsListProps {
  transactions?: Transaction[];
}

const TransactionsList: React.FC<TransactionsListProps> = ({ transactions = mockTransactions }) => {
  if (!transactions || transactions.length === 0) {
    // Instead of showing no transactions, show the mock data
    transactions = mockTransactions;
  }

  return (
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
  );
};

export default TransactionsList;
