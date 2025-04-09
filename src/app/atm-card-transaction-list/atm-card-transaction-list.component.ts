import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { ATMCardTransactionService } from '../atmcardtransaction.service';
import { ATMCardTransaction } from '../atmcardtransactionmodel/atmcardtransactionmodel.module';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-atm-card-transaction-list',
  templateUrl: './atm-card-transaction-list.component.html',
  styleUrls: ['./atm-card-transaction-list.component.scss']
})
export class AtmCardTransactionListComponent {
  transactions: ATMCardTransaction[] = [];

  constructor(
    private txService: ATMCardTransactionService,
    private toastr: ToastrService,
    private dialog: MatDialog
  ) {
    this.loadTransactions();
  }

  loadTransactions(): void {
    this.transactions = this.txService.getTransactions();
  }

  onTransactionSubmitted(tx: ATMCardTransaction): void {
    this.txService.addTransaction(tx);
    this.loadTransactions();
  }

  reverseTransaction(tx: ATMCardTransaction): void {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '300px',
      data: {
        title: 'Reverse Transaction',
        message: `Are you sure you want to reverse transaction #${tx.id}?`
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.txService.reverseTransaction(tx.id);
        this.toastr.success('Transaction reversed');
        this.loadTransactions();
      }
    });
  }

  deleteTransaction(tx: ATMCardTransaction): void {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '300px',
      data: {
        title: 'Delete Transaction',
        message: `Are you sure you want to delete transaction #${tx.id}?`
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.txService.deleteTransaction(tx.id);
        this.toastr.success('Transaction deleted');
        this.loadTransactions();
      }
    });
  }
}

