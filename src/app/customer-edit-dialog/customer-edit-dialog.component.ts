import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { Customer } from '../customermodel/customermodel.module';

@Component({
  selector: 'app-customer-edit-dialog',
  templateUrl: './customer-edit-dialog.component.html',
  styleUrls: ['./customer-edit-dialog.component.scss']
})
export class CustomerEditDialogComponent implements OnInit {
  editForm!: FormGroup;
  customers: Customer[] = [];

  constructor(
    public dialogRef: MatDialogRef<CustomerEditDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Customer,
    private fb: FormBuilder,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.editForm = this.fb.group({
      fullName: [this.data.fullName, Validators.required],
      email: [this.data.email, [Validators.required, Validators.email]],
      phone: [this.data.phone, Validators.required],
      address: [this.data.address, Validators.required],
      nationalId: [this.data.nationalId, Validators.required],
      dateOfBirth: [this.data.dateOfBirth, Validators.required],
    });

    this.customers = JSON.parse(localStorage.getItem('customers') || '[]');
  }

  onSubmit(): void {
    if (this.editForm.valid) {
      const updatedCustomer: Customer = {
        id: this.data.id,
        ...this.editForm.value
      };

      const index = this.customers.findIndex(c => c.id === this.data.id);
      if (index !== -1) {
        this.customers[index] = updatedCustomer;
        localStorage.setItem('customers', JSON.stringify(this.customers));
        this.toastr.success('Customer updated successfully!');
        this.dialogRef.close(true); // notify parent to reload list
      }
    }
  }

  close(): void {
    this.dialogRef.close();
  }
}
