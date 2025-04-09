import { Injectable } from '@angular/core';
import { Customer } from './customermodel/customermodel.module';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {
  private storageKey = 'customers';

  constructor() {}

  getCustomers(): Customer[] {
    return JSON.parse(localStorage.getItem(this.storageKey) || '[]');
  }

  saveCustomers(customers: Customer[]): void {
    localStorage.setItem(this.storageKey, JSON.stringify(customers));
  }

  addCustomer(customer: Customer): void {
    const customers = this.getCustomers();
    customer.id = new Date().getTime(); // unique ID
    customers.push(customer);
    this.saveCustomers(customers);
  }

  updateCustomer(updated: Customer): void {
    const customers = this.getCustomers().map(c =>
      c.id === updated.id ? updated : c
    );
    this.saveCustomers(customers);
  }

  deleteCustomer(id: number): void {
    const customers = this.getCustomers().filter(c => c.id !== id);
    this.saveCustomers(customers);
  }

  getCustomerById(id: number): Customer | undefined {
    return this.getCustomers().find(c => c.id === id);
  }
}
