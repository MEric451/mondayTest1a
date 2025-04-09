import { TestBed } from '@angular/core/testing';

import { AtmcardtransactionService } from './atmcardtransaction.service';

describe('AtmcardtransactionService', () => {
  let service: AtmcardtransactionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AtmcardtransactionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
