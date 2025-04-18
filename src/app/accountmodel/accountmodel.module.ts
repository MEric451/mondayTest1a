export interface Account {
  id: string;
  customerId: string;
  customerName: string;  // Add customerName to store the name
  accountNumber: string;
  type: string;
  balance: number;
}
