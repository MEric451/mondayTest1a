import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';

import { AccountService } from '../account.service';
import { CustomerService } from '../customer.service';
import { Account } from '../accountmodel/accountmodel.module';
import { ViewAccountDialogComponent } from '../view-account-dialog/view-account-dialog.component';
import { EditAccountDialogComponent } from '../edit-account-dialog/edit-account-dialog.component';

@Component({
  selector: 'app-create-account',
  templateUrl: './create-account.component.html',
  styleUrls: ['./create-account.component.scss']
})
export class CreateAccountComponent implements OnInit {
  accountForm: FormGroup;
  customerIds: { id: string; name: string }[] = [];
  account: Account | null = null;
  accountsList: Account[] = [];
  displayedColumns: string[] = ['accountNumber', 'customerId', 'type', 'balance', 'actions'];
  selectedCustomerId = '';


  constructor(
    private fb: FormBuilder,
    private accountService: AccountService,
    private customerService: CustomerService,
    private dialog: MatDialog,
    private toastr: ToastrService
  ) {
    this.accountForm = this.fb.group({
      customerId: ['', Validators.required],
      type: ['', Validators.required],
      balance: [0, [Validators.required, Validators.min(0)]]
    });
  }

  ngOnInit(): void {
    this.loadCustomerIds();
    this.loadAccountsData();
  }

  loadCustomerIds(): void {
    const customers = this.customerService.getCustomers();
    this.customerIds = customers.map(c => ({
      id: c.id.toString(),
      name: `${c.fullName} (${c.id})`
    }));
  }

  loadAccountsData(): void {
    const rawAccounts = this.accountService.getAccounts();
    const customers = this.customerService.getCustomers();

    this.accountsList = rawAccounts.map(acc => {
      const cust = customers.find(c => c.id.toString() === acc.customerId);
      return {
        ...acc,
        customerName: cust ? cust.fullName : 'Unknown Customer'
      };
    });
  }

  generateAccountNumber(): string {
    return 'ACC-' + Math.floor(Math.random() * 1000000);
  }

  generateUniqueId(): string {
    const accounts = JSON.parse(localStorage.getItem('accounts') || '[]');
    return (accounts.length + 1).toString();
  }

  onSubmit(): void {
    if (this.accountForm.valid) {
      const accountData: Account = {
        ...this.accountForm.value,
        accountNumber: this.generateAccountNumber(),
        id: this.generateUniqueId()
      };
      this.createAccount(accountData);
    }
  }

  createAccount(accountData: Account): void {
    this.accountService.createAccount(accountData);
    this.loadAccountsData();
    this.toastr.success('Account created successfully!');
    this.resetFormFields();
  }

  resetFormFields(){
    this.accountForm.reset();
  }
  onCustomerChange(event: any): void {
    this.accountForm.get('customerId')?.setValue(event.value);
  }

  viewAccount(account: Account): void {
    this.dialog.open(ViewAccountDialogComponent, {
      width: '500px',
      data: account
    });
  }

  editAccount(account: Account): void {
    const dialogRef = this.dialog.open(EditAccountDialogComponent, {
      width: '500px',
      data: account
    });
    dialogRef.afterClosed().subscribe((updatedAccount: Account) => {
      if (updatedAccount) {
        updatedAccount.accountNumber = account.accountNumber;

        this.accountService.updateAccount(updatedAccount);
        this.loadAccountsData();
        this.toastr.success('Account updated successfully!');
      }
    });
  }

  deleteAccount(accountId: string): void {
    if (confirm('Are you sure you want to delete this account?')) {
      this.accountService.deleteAccount(accountId);
      this.loadAccountsData();
      this.toastr.success('Account deleted successfully!');
    }
  }
}
