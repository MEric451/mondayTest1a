export interface Account {
  id: number;
  customerId: number;
  cardNumber: string;
  type: string; // e.g. 'Savings', 'Current'
  balance: number;
}

