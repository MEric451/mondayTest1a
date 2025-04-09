import { Injectable } from '@angular/core';
import { ATMCard } from './atmcardmodel/atmcardmodel.module';

@Injectable({
  providedIn: 'root'
})
export class AtmcardService {

  private storageKey = 'atmCards';

  getCards(): ATMCard[] {
    const data = localStorage.getItem(this.storageKey);
    return data ? JSON.parse(data) : [];
  }

  getCardsByAccount(accountId: number): ATMCard[] {
    return this.getCards().filter(card => card.accountId === accountId);
  }

  addCard(card: ATMCard): void {
    const cards = this.getCards();
    card.id = Date.now();
    cards.push(card);
    this.save(cards);
  }

  updateCard(updated: ATMCard): void {
    const cards = this.getCards().map(card => card.id === updated.id ? updated : card);
    this.save(cards);
  }

  deleteCard(id: number): void {
    const cards = this.getCards().filter(card => card.id !== id);
    this.save(cards);
  }

  private save(cards: ATMCard[]): void {
    localStorage.setItem(this.storageKey, JSON.stringify(cards));
  }
}
