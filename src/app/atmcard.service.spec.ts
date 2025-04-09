import { TestBed } from '@angular/core/testing';

import { AtmcardService } from './atmcard.service';

describe('AtmcardService', () => {
  let service: AtmcardService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AtmcardService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
