export interface ATMCardTransaction {
  id: number;
  cardNumber: string;
  amount: number;
  type: 'Withdrawal' | 'Deposit';
  date: string;
  status: 'Completed' | 'Reversed';
}
