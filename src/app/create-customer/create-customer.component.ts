import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CustomerService } from '../customer.service';
import { ToastrService } from 'ngx-toastr';
import { Customer } from '../customermodel/customermodel.module';

@Component({
  selector: 'app-create-customer',
  templateUrl: './create-customer.component.html',
  styleUrls: ['./create-customer.component.scss']
})
export class CreateCustomerComponent {
  @Input() customer: Customer | null = null;
  @Output() formSubmitted = new EventEmitter<Customer>();
  form: FormGroup;

  constructor(private fb: FormBuilder, private toastr: ToastrService) {
    this.form = this.fb.group({
      id: [null],
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    if (this.customer) {
      this.form.patchValue(this.customer);
    }
  }

  onSubmit(): void {
    if (this.form.valid) {
      this.formSubmitted.emit(this.form.value);
      const action = this.customer ? 'updated' : 'created';
      this.toastr.success(`Customer ${action} successfully`);
      this.form.reset();
    } else {
      this.toastr.error('Please fill in all required fields');
    }
  }
}
