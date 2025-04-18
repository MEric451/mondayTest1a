import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { AccountService } from '../account.service';
import { Account } from '../accountmodel/accountmodel.module';
import { ATMCardService } from '../atmcard.service';
import { ATMCard } from '../atmcardmodel/atmcardmodel.module';
import { TransactionService } from '../transaction.service';
import { Transaction } from '../transactionmodel/transactionmodel.module';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';
import { CustomerService } from '../customer.service';
import { Customer } from '../customermodel/customermodel.module';

@Component({
  selector: 'app-transactions',
  templateUrl: './transactions.component.html',
  styleUrls: ['./transactions.component.scss']
})

export class TransactionsComponent implements OnInit {
  customers: Customer[] =[];
  transactionForm!: FormGroup;
  transactions: Transaction[] = [];
  atmCards: ATMCard[] = [];

  constructor(
    private fb: FormBuilder,
    private transactionService: TransactionService,
    private atmCardService: ATMCardService,
    private accountService: AccountService,
    private customerService: CustomerService,
    private dialog: MatDialog,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.loadATMcards();
    this.loadTransactions();
    this.loadCustomers();
    this.initForm();
  }

  initForm(): void {
    this.transactionForm = this.fb.group({
      atmCardId: ['', Validators.required],
      type: ['Withdrawal', Validators.required],
      amount: [null, [Validators.required, Validators.min(1)]]
    });
  }

  loadCustomers(): void {
    this.customers = this.customerService.getCustomers();
  }

  loadATMcards(): void {
    this.atmCards = this.atmCardService.getAllCards().filter(card => card.status === 'Active');
  }

  loadTransactions(): void {
    this.transactions = this.transactionService.getAll();
  }

  getAccountIdByCard(cardId: number): string {
    const card = this.atmCards.find(c => c.id === cardId);
    return card ? card.accountId : '';
  }

  onSubmit(): void {
    if (this.transactionForm.valid) {
      const formValue = this.transactionForm.value;
      const transaction: Transaction = {
        id: '',
        atmCardId: formValue.atmCardId,
        accountId: this.getAccountIdByCard(formValue.atmCardId),
        type: formValue.type,
        amount: formValue.amount,
        date: '',
        status: 'Completed'
      };
      this.transactionService.create(transaction);
      this.transactionForm.reset();
      this.loadTransactions();
    }
  }

  reverseTransaction(id: string): void {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      data: {
        title: 'Confirm Reversal',
        message: 'Are you sure you want to reverse this transaction?'
      }
    });
  
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.transactionService.reverse(id);
        this.toastr.success('Transaction reversed successfully');
        this.loadTransactions();
      }
    });
  }
  
  confirmDelete(id: string): void {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      data: {
        title: 'Delete Transaction',
        message: 'Are you sure you want to delete this transaction?'
      }
    });
  
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.transactionService.delete(id);
        this.toastr.success('Transaction deleted successfully');
        this.loadTransactions();
      }
    });
  }
  
  getCustomerNameByCard(cardId: number): string {
    const card = this.atmCards.find(c => c.id === cardId);
    if (!card) return 'Unknown';
  
    const account = this.accountService.getAccounts().find(a => a.id === card.accountId);
    if (!account) return 'Unknown';
  
    const customer = this.customers.find(c => c.id === +account.customerId);
    return customer ? customer.fullName : 'Unknown';
  }
  

  onCancel(): void {
    this.transactionForm.reset();
  }
  
}