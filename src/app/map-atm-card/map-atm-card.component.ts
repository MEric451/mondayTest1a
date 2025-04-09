import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { AtmcardService} from '../atmcard.service';
import { AccountService } from '../account.service';

import { ToastrService } from 'ngx-toastr';
import { ATMCard } from '../atmcardmodel/atmcardmodel.module';

@Component({
  selector: 'app-map-atm-card',
  templateUrl: './map-atm-card.component.html',
  styleUrls: ['./map-atm-card.component.scss']
})
export class MapAtmCardComponent implements OnInit {
  @Input() card: ATMCard | null = null;
  @Output() formSubmitted = new EventEmitter<ATMCard>();

  cardForm!: FormGroup;
  accountIds: number[] = [];

  constructor(
    private fb: FormBuilder,
    private accountService: AccountService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.accountIds = this.accountService.getAllAccounts().map(acc => acc.id);

    this.cardForm = this.fb.group({
      id: [null],
      accountId: [null, Validators.required],
      cardNumber: ['', [Validators.required, Validators.minLength(12)]],
      expiryDate: ['', Validators.required],
      status: ['Active', Validators.required]
    });

    if (this.card) {
      this.cardForm.patchValue(this.card);
    }
  }

  onSubmit(): void {
    if (this.cardForm.invalid) return;

    const card: ATMCard = this.cardForm.value;
    this.formSubmitted.emit(card);

    const message = card.id ? 'ATM Card updated successfully' : 'ATM Card created successfully';
    this.toastr.success(message);

    this.cardForm.reset();
  }
}
