export interface Transaction {
  id: string;
  atmCardId: number;
  accountId: string;
  type: 'Withdrawal' | 'Deposit';
  amount: number;
  date: string; // e.g., '2025-04-13'
  status: 'Completed' | 'Reversed';
}
