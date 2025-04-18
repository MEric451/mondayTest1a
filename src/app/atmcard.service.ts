import { Injectable } from '@angular/core';
import { ATMCard } from './atmcardmodel/atmcardmodel.module';

@Injectable({
  providedIn: 'root'
})
export class ATMCardService {
  private localStorageKey = 'atmCards';

  constructor() {}

  // Load all ATM cards
  getAllCards(): ATMCard[] {
    const storedCards = localStorage.getItem(this.localStorageKey);
    return storedCards ? JSON.parse(storedCards) : [];
  }

  // Save all ATM cards to LocalStorage
  public saveCards(cards: ATMCard[]): void {
    localStorage.setItem(this.localStorageKey, JSON.stringify(cards));
  }

  // Generate a random card number (e.g., 1234 5678 9123 4567)
  public generateCardNumber(): string {
    const digits = () => Math.floor(1000 + Math.random() * 9000);
    return `${digits()} ${digits()} ${digits()} ${digits()}`;
  }

  // Generate a 3-digit PIN
  public generatePIN(): string {
    return Math.floor(100 + Math.random() * 900).toString();
  }

  // Generate an expiry date (5 years from now)
  // Generate an expiry date (5 years from now) in MM/YYYY format
public generateExpiryDate(): string {
  const now = new Date();
  const future = new Date(now.setFullYear(now.getFullYear() + 5));  // 5 years from now
  const month = ('0' + (future.getMonth() + 1)).slice(-2);  // Get month and format it to two digits
  const year = future.getFullYear();
  return `${month}/${year}`;  // Return in MM/YYYY format
}


  // Add new ATM card
  createCard(accountId: string, expiryDate: string): ATMCard {
    const cards = this.getAllCards();
    const newCard: ATMCard = {
      id: cards.length + 1,
      accountId,
      cardNumber: this.generateCardNumber(),
      expiryDate,  // Use the passed expiryDate
      status: 'Active',
      pin: this.generatePIN()
    };
    cards.push(newCard);
    this.saveCards(cards);
    return newCard;
  }
  

  // Delete ATM card
  deleteCard(cardId: number): void {
    const cards = this.getAllCards().filter(card => card.id !== cardId);
    this.saveCards(cards);
  }

  // Toggle card status (Active/Inactive)
  toggleCardStatus(cardId: number): void {
    const cards = this.getAllCards();
    const card = cards.find(c => c.id === cardId);
    if (card) {
      card.status = card.status === 'Active' ? 'Inactive' : 'Active';
      this.saveCards(cards);
    }
  }
}
