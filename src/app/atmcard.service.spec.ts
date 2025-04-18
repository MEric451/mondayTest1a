import { TestBed } from '@angular/core/testing';

import { ATMCardService } from './atmcard.service';

describe('AtmcardService', () => {
  let service: ATMCardService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ATMCardService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
