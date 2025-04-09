import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AtmCardFormComponent } from './atm-card-form.component';

describe('AtmCardFormComponent', () => {
  let component: AtmCardFormComponent;
  let fixture: ComponentFixture<AtmCardFormComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AtmCardFormComponent]
    });
    fixture = TestBed.createComponent(AtmCardFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
