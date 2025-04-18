import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Account } from '../accountmodel/accountmodel.module';

@Component({
  selector: 'app-view-account-dialog',
  templateUrl: './view-account-dialog.component.html',
  styleUrls: ['./view-account-dialog.component.scss']
})
export class ViewAccountDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<ViewAccountDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Account
  ) {}

  onClose(): void {
    this.dialogRef.close();
  }
}