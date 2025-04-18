import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ATMCard } from '../atmcardmodel/atmcardmodel.module';

@Component({
  selector: 'app-view-atm-card',
  templateUrl: './view-atm-card.component.html',
  styleUrls: ['./view-atm-card.component.scss']
})
export class ViewAtmCardComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public data: ATMCard) {}

}
