export interface Transaction {
  id: string;
  atmCardId: string;
  amount: number;
  type: 'deposit' | 'withdrawal'; // Or any other types you need
  date: string;
}