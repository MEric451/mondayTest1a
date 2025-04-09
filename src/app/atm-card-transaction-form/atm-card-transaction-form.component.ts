import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { ATMCardTransaction } from '../atmcardtransactionmodel/atmcardtransactionmodel.module';
import { AtmcardService } from '../atmcard.service';

@Component({
  selector: 'app-atm-card-transaction-form',
  templateUrl: './atm-card-transaction-form.component.html',
  styleUrls: ['./atm-card-transaction-form.component.scss']
})
export class AtmCardTransactionFormComponent implements OnInit {
  @Output() transactionSubmitted = new EventEmitter<ATMCardTransaction>();
  form!: FormGroup;
  cardNumbers: string[] = [];

  constructor(
    private fb: FormBuilder,
    private cardService: AtmcardService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.cardNumbers = this.cardService.getCards().map(c => c.cardNumber);

    this.form = this.fb.group({
      cardNumber: ['', Validators.required],
      type: ['Withdrawal', Validators.required],
      amount: [null, [Validators.required, Validators.min(1)]],
    });
  }

  submit(): void {
    if (this.form.invalid) return;

    const tx: ATMCardTransaction = {
      id: 0,
      ...this.form.value,
      date: new Date().toISOString(),
      status: 'Completed'
    };

    this.transactionSubmitted.emit(tx);
    this.toastr.success('Transaction completed successfully');
    this.form.reset({ type: 'Withdrawal' });
  }
}