import { Component, EventEmitter, Inject, Input, OnInit, Output } from '@angular/core';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { ATMCardService } from '../atmcard.service';

import { ToastrService } from 'ngx-toastr';
import { ATMCard } from '../atmcardmodel/atmcardmodel.module';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Account } from '../accountmodel/accountmodel.module';
import { MatDialog } from '@angular/material/dialog';
import { ViewAtmCardComponent } from '../view-atm-card/view-atm-card.component';
import { AccountService } from '../account.service';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';
import { Customer } from '../customermodel/customermodel.module';
import { CustomerService } from '../customer.service';

@Component({
  selector: 'app-map-atm-card',
  templateUrl: './map-atm-card.component.html',
  styleUrls: ['./map-atm-card.component.scss']
})
export class MapAtmCardComponent implements OnInit {
  customers: Customer[] = [];
  atmCardForm: FormGroup; 
  accounts: Account[] = [];
  atmCards: ATMCard[] = [];
  selectedAccountId: string = '';
  showCardDetailsId: number | null = null;
  showCardForm: boolean = false;

  displayedColumns: string[] = ['accountNumber', 'cardNumber', 'expiryDate', 'status', 'actions'];

  constructor(
    private atmCardService: ATMCardService,
    private accountService: AccountService,
    private customerService: CustomerService,
    private toastr: ToastrService,
    private dialog: MatDialog,
    private fb: FormBuilder
  ) {
    this.atmCardForm = this.fb.group({
      cardNumber: [{ value: '', disabled: true }, Validators.required],
      expiryDate: ['', Validators.required],
      pin: [{value: '', disabled: true}, Validators.required]
    });
  }

  ngOnInit(): void {
    this.accounts = this.accountService.getAccounts();
    this.customers = this.customerService.getCustomers();
    this.loadCards();
    this.generateCardNumber();
  }

  getCustomerName(customerId: string): string {
    const numericId = Number(customerId);
    const customer = this.customers.find(c => c.id === numericId);
    return customer ? `${customer.fullName}` : 'Unknown';
  }

  openCardForm(): void {
    if (!this.selectedAccountId) {
      this.toastr.warning('Please select an account.');
      return;
    }
    this.generateCardDetails();
    this.showCardForm = true;
  }

  closeCardForm(): void {
    this.showCardForm = false;
  }

  cancelAction(): void {
    this.selectedAccountId = ''; // Reset the selected account
    this.atmCardForm.reset();     // Reset the form
    this.generateCardNumber();    // Generate a new card number
    this.showCardForm = false;    // Close the form
  }
  generateCardDetails(): void {
    const cardNumber = this.atmCardService.generateCardNumber();
    const pin = this.atmCardService.generatePIN();
    const expiryDate = this.atmCardService.generateExpiryDate();  // Get the generated expiry date
    this.atmCardForm.controls['cardNumber'].setValue(cardNumber);
    this.atmCardForm.controls['pin'].setValue(pin);
    this.atmCardForm.controls['expiryDate'].setValue(expiryDate);  // Set the expiry date in the form
  }
  

generateCardNumber(): void{
  const cardNumber =  this.atmCardService.generateCardNumber();
  this.atmCardForm.controls['cardNumber'].setValue(cardNumber);
}

  loadCards(): void {
    this.atmCards = this.atmCardService.getAllCards();
  }

  mapCard(): void {
    if (!this.selectedAccountId) {
      this.toastr.warning('Please select an account.');
      return;
    }

    const newCard = this.atmCardService.createCard(this.selectedAccountId, this.atmCardForm.get('expiryDate')?.value);
    this.loadCards();
    this.toastr.success(`ATM Card ending in ${newCard.cardNumber.slice(-4)} created!`, 'Card Mapped');
    this.selectedAccountId = '';
    this.atmCardForm.reset();
    this.generateCardNumber();
  }

  deleteCard(cardId: number): void {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '400px',
      data: {
        title: 'Delete ATM Card',
        message: 'Are you sure you want to delete this ATM card?'
      }
    });
  
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.atmCardService.deleteCard(cardId);
        this.toastr.success('ATM Card deleted successfully!', 'Deleted');
        this.loadCards();
      }
    });
  }

  toggleStatus(cardId: number): void {
    this.atmCardService.toggleCardStatus(cardId);
    this.loadCards();
    this.toastr.info('Card status updated.', 'Status Changed');
  }

  viewDetails(cardId: number): void {
    this.showCardDetailsId = this.showCardDetailsId === cardId ? null : cardId;
  }

  getAccountNumber(accountId: string): string | undefined {
    const account = this.accounts.find(acc => acc.id === accountId);
    return account?.accountNumber;
  }

  viewCard(card: ATMCard): void{
this.dialog.open(ViewAtmCardComponent, {
  width: '600px',
  data: card
});
  }
  
}