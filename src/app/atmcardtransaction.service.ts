import { Injectable } from '@angular/core';
import { ATMCardTransaction } from './atmcardtransactionmodel/atmcardtransactionmodel.module';
import { AccountService } from './account.service';

@Injectable({
  providedIn: 'root'
})
export class ATMCardTransactionService {
  private storageKey = 'atmCardTransactions';

  constructor(private accountService: AccountService) {}

  getTransactions(): ATMCardTransaction[] {
    return JSON.parse(localStorage.getItem(this.storageKey) || '[]');
  }

  getByCardNumber(cardNumber: string): ATMCardTransaction[] {
    return this.getTransactions().filter(tx => tx.cardNumber === cardNumber);
  }

  addTransaction(tx: ATMCardTransaction): void {
    const transactions = this.getTransactions();
    tx.id = Date.now();
    tx.status = 'Completed';
    transactions.push(tx);
    this.save(transactions);

    // Update account balance
    const card = this.accountService.getAllAccounts().find(a => a.cardNumber === tx.cardNumber);
    if (card) {
      const account = this.accountService.getAccountById(card.id);
      if (account) {
        if (tx.type === 'Deposit') {
          account.balance += tx.amount;
        } else if (tx.type === 'Withdrawal') {
          account.balance -= tx.amount;
        }
        this.accountService.updateAccount(account);
      }
    }
  }

  reverseTransaction(id: number): void {
    const transactions = this.getTransactions();
    const tx = transactions.find(t => t.id === id);
    if (!tx || tx.status === 'Reversed') return;

    tx.status = 'Reversed';
    // Reverse account balance
    const card = this.accountService.getAllAccounts().find(a => a.cardNumber === tx.cardNumber);
    if (card) {
      const account = this.accountService.getAccountById(card.id);
      if (account) {
        if (tx.type === 'Deposit') {
          account.balance -= tx.amount;
        } else {
          account.balance += tx.amount;
        }
        this.accountService.updateAccount(account);
      }
    }

    this.save(transactions);
  }

  deleteTransaction(id: number): void {
    const txs = this.getTransactions().filter(tx => tx.id !== id);
    this.save(txs);
  }

  private save(data: ATMCardTransaction[]) {
    localStorage.setItem(this.storageKey, JSON.stringify(data));
  }
}
