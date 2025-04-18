import { Injectable } from '@angular/core';
import { Account } from './accountmodel/accountmodel.module';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  private accountsSubject = new BehaviorSubject<Account[]>(this.loadAccountsFromLocalStorage());
  accounts$ = this.accountsSubject.asObservable();

  constructor() {}

  private loadAccountsFromLocalStorage(): Account[] {
    const storedAccounts = localStorage.getItem('accounts');
    return storedAccounts ? JSON.parse(storedAccounts) : [];
  }

  private saveAccountsToLocalStorage(accounts: Account[]): void {
    localStorage.setItem('accounts', JSON.stringify(accounts));
    this.accountsSubject.next(accounts);  // Update the observable with the new account list
  }

  // Create Account
  createAccount(account: Account): void {
    const accounts = this.loadAccountsFromLocalStorage();
  
    // Fetch the customer data to get the full name
    const customer = JSON.parse(localStorage.getItem('customers') || '[]')
      .find((cust: any) => cust.customerId === account.customerId);  // Correctly compare with customerId
  console.log(customer);
    // Set customer name if available
    account.customerName = customer ? customer.fullName : 'Unknown Customer';
  
    account.id = (accounts.length + 1).toString();  // Assign a new id
    accounts.push(account);
    this.saveAccountsToLocalStorage(accounts);
  }

  // Get all Accounts (will return the observable)
  getAccounts(): Account[] {
    return this.loadAccountsFromLocalStorage();
  }

  // Update Account
  updateAccount(updatedAccount: Account): void {
    const accounts = this.loadAccountsFromLocalStorage();
    const index = accounts.findIndex((acc) => acc.id === updatedAccount.id);
    if (index !== -1) {
      const customer = JSON.parse(localStorage.getItem('customers') || '[]')
        .find((cust: any) => cust.id === updatedAccount.customerId);
      updatedAccount.customerName = customer ? customer.fullName : '';  // Update customer name
      
      accounts[index] = updatedAccount;
      this.saveAccountsToLocalStorage(accounts);
    }
  }

  // Delete Account
  deleteAccount(accountId: string): void {
    const accounts = this.loadAccountsFromLocalStorage();
    const updatedAccounts = accounts.filter((acc) => acc.id !== accountId);
    this.saveAccountsToLocalStorage(updatedAccounts);
  }
}