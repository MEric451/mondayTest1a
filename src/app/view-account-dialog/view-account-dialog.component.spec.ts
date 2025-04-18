import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewAccountDialogComponent } from './view-account-dialog.component';

describe('ViewAccountDialogComponent', () => {
  let component: ViewAccountDialogComponent;
  let fixture: ComponentFixture<ViewAccountDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ViewAccountDialogComponent]
    });
    fixture = TestBed.createComponent(ViewAccountDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
