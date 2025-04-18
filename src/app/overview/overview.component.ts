import { Component, OnInit } from '@angular/core';
import { AccountService } from '../account.service';
import { ATMCardService } from '../atmcard.service';
import { CustomerService } from '../customer.service';
import { TransactionService } from '../transaction.service';

@Component({
  selector: 'app-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.scss']
})

export class OverviewComponent implements OnInit {
  totalCustomers = 0;
  totalAccounts = 0;
  totalCards = 0;
  totalTransactions = 0;

  constructor(
    private custSvc: CustomerService,
    private accSvc: AccountService,
   private cardSvc: ATMCardService,
   private txnSvc: TransactionService
  ) {}

  ngOnInit() {
    this.totalCustomers    = this.custSvc.getCustomers().length;
    this.totalAccounts     = this.accSvc.getAccounts().length;
    this.totalCards        = this.cardSvc.getAllCards().length;
    this.totalTransactions = this.txnSvc.getTransactions().length;
  }
}

