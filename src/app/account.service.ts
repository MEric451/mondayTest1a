import { Injectable } from '@angular/core';
import { Account } from './accountmodel/accountmodel.module';

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  private storageKey = 'accounts';

  constructor() {}

  // Fetch all accounts from LocalStorage
  getAllAccounts(): Account[] {
    const data = localStorage.getItem(this.storageKey);
    return data ? JSON.parse(data) : [];
  }

  // Get account by its ID
  getAccountById(id: number): Account | undefined {
    const accounts = this.getAllAccounts();
    return accounts.find(acc => acc.id === id);
  }

  // Fetch accounts by customerId
  getAccountsByCustomer(customerId: number): Account[] {
    return this.getAllAccounts().filter(acc => acc.customerId === customerId);
  }

  // Add a new account
  addAccount(account: Account): void {
    const accounts = this.getAllAccounts();
    account.id = Date.now(); // simple unique ID
    accounts.push(account);
    this.save(accounts);
  }

  // Update an existing account
  updateAccount(account: Account): void {
    const accounts = this.getAllAccounts().map(acc => acc.id === account.id ? account : acc);
    this.save(accounts);
  }

  // Delete an account
  deleteAccount(id: number): void {
    const accounts = this.getAllAccounts().filter(acc => acc.id !== id);
    this.save(accounts);
  }

  // Save accounts to LocalStorage
  private save(accounts: Account[]): void {
    localStorage.setItem(this.storageKey, JSON.stringify(accounts));
  }
}