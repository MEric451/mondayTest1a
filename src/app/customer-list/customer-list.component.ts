import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CustomerService } from '../customer.service';
import { MatDialog } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { Customer } from '../customermodel/customermodel.module';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-customer-list',
  templateUrl: './customer-list.component.html',
  styleUrls: ['./customer-list.component.scss']
})
export class CustomerListComponent {
  @Input() customer: Customer | null = null;
  @Output() formSubmitted = new EventEmitter<Customer>();
  @Output() cancel = new EventEmitter<void>();
  
  customers: Customer[] = [];
  selectedCustomer: Customer | null = null;

  constructor(
    private customerService: CustomerService,
    private dialog: MatDialog,
    private toastr: ToastrService
  ) {
    this.loadCustomers();
  }

  loadCustomers(): void {
    this.customers = this.customerService.getCustomers();
  }

  editCustomer(customer: Customer): void {
    this.selectedCustomer = { ...customer };
  }

  onFormSubmit(customer: Customer): void {
    if (customer.id) {
      this.customerService.updateCustomer(customer);
    } else {
      this.customerService.addCustomer(customer);
    }
    this.loadCustomers();
    this.selectedCustomer = null;
  }

  confirmDelete(customer: Customer): void {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '300px',
      data: {
        title: 'Confirm Deletion',
        message: `Are you sure you want to delete ${customer.name}?`,
      },
    });

    dialogRef.afterClosed().subscribe((confirmed: boolean) => {
      if (confirmed) {
        this.customerService.deleteCustomer(customer.id);
        this.toastr.success('Customer deleted successfully');
        this.loadCustomers();
      }
    });
  }

  cancelEdit(): void {
    this.selectedCustomer = null;
  }
}
