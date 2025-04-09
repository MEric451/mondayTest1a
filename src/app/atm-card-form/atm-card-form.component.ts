import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { AtmcardService } from '../atmcard.service';
import { ATMCard } from '../atmcardmodel/atmcardmodel.module';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-atm-card-form',
  templateUrl: './atm-card-form.component.html',
  styleUrls: ['./atm-card-form.component.scss']
})
export class AtmCardFormComponent {
  @Input() card: ATMCard | null = null;
  @Output() formSubmitted = new EventEmitter<ATMCard>();
  @Output() cancel = new EventEmitter<void>();
 cards: ATMCard[] = [];
  selectedCard: ATMCard | null = null;

  constructor(
    private cardService: AtmcardService,
    private toastr: ToastrService,
    private dialog: MatDialog
  ) {
    this.loadCards();
  }

  loadCards(): void {
    this.cards = this.cardService.getCards();
  }

  editCard(card: ATMCard): void {
    this.selectedCard = { ...card };
  }

  onFormSubmit(card: ATMCard): void {
    if (card.id) {
      this.cardService.updateCard(card);
    } else {
      this.cardService.addCard(card);
    }
    this.loadCards();
    this.selectedCard = null;
  }

  confirmDelete(card: ATMCard): void {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '300px',
      data: {
        title: 'Delete ATM Card',
        message: `Are you sure you want to delete card #${card.cardNumber}?`,
      },
    });

    dialogRef.afterClosed().subscribe((confirmed) => {
      if (confirmed) {
        this.cardService.deleteCard(card.id);
        this.toastr.success('ATM Card deleted successfully');
        this.loadCards();
      }
    });
  }

  cancelEdit(): void {
    this.selectedCard = null;
  }
}
