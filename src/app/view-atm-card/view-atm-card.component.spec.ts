import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewAtmCardComponent } from './view-atm-card.component';

describe('ViewAtmCardComponent', () => {
  let component: ViewAtmCardComponent;
  let fixture: ComponentFixture<ViewAtmCardComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ViewAtmCardComponent]
    });
    fixture = TestBed.createComponent(ViewAtmCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
