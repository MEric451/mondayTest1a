import { Injectable } from '@angular/core';
import { Account } from './accountmodel/accountmodel.module';
import { Transaction } from './transactionmodel/transactionmodel.module';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class TransactionService {

  private localStorageKey = 'transactions';

  constructor(private toastr: ToastrService) {}

  public getTransactions(): Transaction[] {
    const stored = localStorage.getItem(this.localStorageKey);
    return stored ? JSON.parse(stored) : [];
  }

  private saveTransactions(transactions: Transaction[]) {
    localStorage.setItem(this.localStorageKey, JSON.stringify(transactions));
  }

  private updateAccountBalance(accountId: string, amount: number, type: 'Withdrawal' | 'Deposit', reverse = false) {
    const accounts: Account[] = JSON.parse(localStorage.getItem('accounts') || '[]');
    const index = accounts.findIndex(acc => acc.id === accountId);
    if (index !== -1) {
      const change = reverse
        ? (type === 'Deposit' ? -amount : amount)
        : (type === 'Deposit' ? amount : -amount);
      accounts[index].balance += change;
      localStorage.setItem('accounts', JSON.stringify(accounts));
    }
  }

  getAll(): Transaction[] {
    return this.getTransactions();
  }

  create(transaction: Transaction): void {
    const transactions = this.getTransactions();
    transaction.id = (transactions.length + 1).toString();
    transaction.date = new Date().toISOString().split('T')[0];
    transaction.status = 'Completed';
    transactions.push(transaction);
    this.saveTransactions(transactions);
    this.updateAccountBalance(transaction.accountId, transaction.amount, transaction.type);
    this.toastr.success('Transaction added successfully!');
  }

  delete(id: string): void {
    const transactions = this.getTransactions();
    const transaction = transactions.find(t => t.id === id);
    if (!transaction) return;

    // Reverse the effect before deletion
    this.updateAccountBalance(transaction.accountId, transaction.amount, transaction.type, true);

    const updated = transactions.filter(t => t.id !== id);
    this.saveTransactions(updated);
    this.toastr.success('Transaction deleted successfully!');
  }

  reverse(id: string): void {
    const transactions = this.getTransactions();
    const index = transactions.findIndex(t => t.id === id);
    if (index !== -1 && transactions[index].status !== 'Reversed') {
      this.updateAccountBalance(transactions[index].accountId, transactions[index].amount, transactions[index].type, true);
      transactions[index].status = 'Reversed';
      this.saveTransactions(transactions);
      this.toastr.success('Transaction reversed successfully!');
    }
  }
}