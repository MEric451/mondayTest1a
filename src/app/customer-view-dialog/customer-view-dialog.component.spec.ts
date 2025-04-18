import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerViewDialogComponent } from './customer-view-dialog.component';

describe('CustomerViewDialogComponent', () => {
  let component: CustomerViewDialogComponent;
  let fixture: ComponentFixture<CustomerViewDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CustomerViewDialogComponent]
    });
    fixture = TestBed.createComponent(CustomerViewDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
