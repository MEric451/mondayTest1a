import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MapAtmCardComponent } from './map-atm-card.component';

describe('MapAtmCardComponent', () => {
  let component: MapAtmCardComponent;
  let fixture: ComponentFixture<MapAtmCardComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MapAtmCardComponent]
    });
    fixture = TestBed.createComponent(MapAtmCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
