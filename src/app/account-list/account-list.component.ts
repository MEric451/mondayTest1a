import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AccountService } from '../account.service';
import { MatDialog } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { Account } from '../accountmodel/accountmodel.module';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-account-list',
  templateUrl: './account-list.component.html',
  styleUrls: ['./account-list.component.scss']
})
export class AccountListComponent implements OnInit {
  @Input() account: Account | null = null;  // Add the @Input() here
  @Output() formSubmitted = new EventEmitter<Account>();
  accounts: Account[] = [];
  selectedAccount: Account | null = null;

  constructor(
    private accountService: AccountService,
    private toastr: ToastrService,
    private dialog: MatDialog
  ) {
    this.loadAccounts();
  }
  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }

  loadAccounts(): void {
    this.accounts = this.accountService.getAllAccounts();
  }

  editAccount(account: Account): void {
    this.selectedAccount = { ...account };
  }

  onFormSubmit(account: Account): void {
    if (account.id) {
      this.accountService.updateAccount(account);
    } else {
      this.accountService.addAccount(account);
    }
    this.loadAccounts();
    this.selectedAccount = null;
  }

  confirmDelete(account: Account): void {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '300px',
      data: {
        title: 'Delete Account',
        message: `Are you sure you want to delete account #${account.id}?`,
      },
    });

    dialogRef.afterClosed().subscribe((confirmed) => {
      if (confirmed) {
        this.accountService.deleteAccount(account.id);
        this.toastr.success('Account deleted successfully');
        this.loadAccounts();
      }
    });
  }

  cancelEdit(): void {
    this.selectedAccount = null;
  }
}
