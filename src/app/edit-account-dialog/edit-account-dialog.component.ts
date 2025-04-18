import { Component, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Account } from '../accountmodel/accountmodel.module';

@Component({
  selector: 'app-edit-account-dialog',
  templateUrl: './edit-account-dialog.component.html',
  styleUrls: ['./edit-account-dialog.component.scss']
})
export class EditAccountDialogComponent {
  accountForm: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<EditAccountDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Account,
    private fb: FormBuilder
  ) {
    this.accountForm = this.fb.group({
      id: [data.id],
      customerId: [data.customerId, Validators.required],
      type: [data.type, Validators.required],
      balance: [data.balance, [Validators.required, Validators.min(0)]],
    });
  }

  onSave(): void {
    if (this.accountForm.valid) {
      this.dialogRef.close(this.accountForm.value);
    }
  }

  onClose(): void {
    this.dialogRef.close();
  }
}