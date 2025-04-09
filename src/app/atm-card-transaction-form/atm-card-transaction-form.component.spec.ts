import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AtmCardTransactionFormComponent } from './atm-card-transaction-form.component';

describe('AtmCardTransactionFormComponent', () => {
  let component: AtmCardTransactionFormComponent;
  let fixture: ComponentFixture<AtmCardTransactionFormComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AtmCardTransactionFormComponent]
    });
    fixture = TestBed.createComponent(AtmCardTransactionFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
