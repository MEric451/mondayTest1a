// create-account.component.ts
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { CustomerService } from '../customer.service';
import { Account } from '../accountmodel/accountmodel.module';

@Component({
  selector: 'app-create-account',
  templateUrl: './create-account.component.html',
  styleUrls: ['./create-account.component.scss']
})
export class CreateAccountComponent implements OnInit {
  @Input() account: Account | null = null;
  @Output() formSubmitted = new EventEmitter<Account>();

  accountForm!: FormGroup;
  customerIds: number[] = [];

  constructor(
    private fb: FormBuilder,
    private toastr: ToastrService,
    private customerService: CustomerService
  ) {}

  ngOnInit(): void {
    this.customerIds = this.customerService.getCustomers().map(c => c.id);
    this.accountForm = this.fb.group({
      id: [null],
      customerId: [null, Validators.required],
      type: ['', Validators.required],
      balance: [0, [Validators.required, Validators.min(0)]],
    });

    if (this.account) {
      this.accountForm.patchValue(this.account);
    }
  }

  onSubmit(): void {
    if (this.accountForm.invalid) return;

    const account: Account = this.accountForm.value;
    this.formSubmitted.emit(account);

    const message = account.id ? 'Account updated successfully' : 'Account created successfully';
    this.toastr.success(message);

    this.accountForm.reset();
  }
}
