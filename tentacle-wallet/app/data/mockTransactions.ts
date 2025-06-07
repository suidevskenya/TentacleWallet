export interface Transaction {
  description: string;
  date: string;
  amount: string;
  currency: string;
}

const mockTransactions: Transaction[] = [
  {
    description: 'Coffee Shop',
    date: 'Jun 7, 10:00 AM',
    amount: '-4.50',
    currency: 'Walrus',
  },
  {
    description: 'Salary',
    date: 'Jun 5, 9:00 AM',
    amount: '+1500.00',
    currency: 'IKA',
  },
  {
    description: 'Grocery Store',
    date: 'Jun 3, 5:30 PM',
    amount: '-76.23',
    currency: 'USDC',
  },
  {
    description: 'Online Subscription',
    date: 'Jun 1, 2:15 PM',
    amount: '-12.99',
    currency: 'SUI',
  }
];

export default mockTransactions;
