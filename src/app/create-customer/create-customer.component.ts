import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CustomerService } from '../customer.service';
import { ToastrService } from 'ngx-toastr';
import { Customer } from '../customermodel/customermodel.module';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-customer',
  templateUrl: './create-customer.component.html',
  styleUrls: ['./create-customer.component.scss']
})
export class CreateCustomerComponent implements OnInit {
  customerForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.customerForm = this.fb.group({
      fullName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', Validators.required],
      address: ['', Validators.required],
      nationalId: ['', Validators.required],
      dateOfBirth: ['', Validators.required],
    });
  }

  onSubmit(): void {
    if (this.customerForm.valid) {
      const customers: Customer[] = JSON.parse(localStorage.getItem('customers') || '[]');
      const newCustomer: Customer = {
        id: Date.now(),
        ...this.customerForm.value
      };
      customers.push(newCustomer);
      localStorage.setItem('customers', JSON.stringify(customers));
  
      this.toastr.success('Customer created successfully!');
      this.router.navigate(['customers']);
  
      // Reset the form after successful submission
      this.customerForm.reset({
        customerId: '',
        type: '',
        balance: 0
      });      
    }
  }
  
}