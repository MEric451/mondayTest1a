import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AtmCardTransactionListComponent } from './atm-card-transaction-list.component';

describe('AtmCardTransactionListComponent', () => {
  let component: AtmCardTransactionListComponent;
  let fixture: ComponentFixture<AtmCardTransactionListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AtmCardTransactionListComponent]
    });
    fixture = TestBed.createComponent(AtmCardTransactionListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
