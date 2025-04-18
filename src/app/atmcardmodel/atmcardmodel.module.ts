export interface ATMCard {
  id: number;
  accountId: string;
  cardNumber: string;
  expiryDate: string;
  status: 'Active' | 'Inactive';
  pin: string; // optional field
}
