import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Customer } from '../customermodel/customermodel.module';

@Component({
  selector: 'app-customer-view-dialog',
  templateUrl: './customer-view-dialog.component.html',
  styleUrls: ['./customer-view-dialog.component.scss']
})
export class CustomerViewDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<CustomerViewDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Customer
  ) {}

  close(): void {
    this.dialogRef.close();
  }
}