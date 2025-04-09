export interface ATMCard {
  id: number;
  accountId: number;
  cardNumber: string;
  expiryDate: string;
  status: 'Active' | 'Inactive';
}
