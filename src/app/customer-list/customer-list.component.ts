import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CustomerService } from '../customer.service';
import { MatDialog } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { Customer } from '../customermodel/customermodel.module';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';
import { Router } from '@angular/router';
import { CustomerViewDialogComponent } from '../customer-view-dialog/customer-view-dialog.component';
import { CustomerEditDialogComponent } from '../customer-edit-dialog/customer-edit-dialog.component';

@Component({
  selector: 'app-customer-list',
  templateUrl: './customer-list.component.html',
  styleUrls: ['./customer-list.component.scss']
})
export class CustomerListComponent implements OnInit {
  customers: Customer[] = [];
  displayedColumns: string[] = ['name', 'email', 'phone', 'actions'];

  constructor(
    private dialog: MatDialog,
    private router: Router,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.loadCustomers();
  }

  loadCustomers(): void {
    this.customers = JSON.parse(localStorage.getItem('customers') || '[]');
  }

  viewCustomer(customer: Customer): void {
    this.dialog.open(CustomerViewDialogComponent, {
      width: '400px',
      data: customer
    });
  }

  editCustomer(customer: Customer): void {
    const dialogRef = this.dialog.open(CustomerEditDialogComponent, {
      width: '500px',
      data: customer,
    });
  
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.loadCustomers(); // reload list after edit
      }
    });
  }

  deleteCustomer(id: number): void {
    if (confirm('Are you sure you want to delete this customer?')) {
      this.customers = this.customers.filter(c => c.id !== id);
      localStorage.setItem('customers', JSON.stringify(this.customers));
      this.toastr.success('Customer deleted!');
    }
  }
}