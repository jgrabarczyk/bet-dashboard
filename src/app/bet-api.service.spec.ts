import { TestBed } from '@angular/core/testing';

import { BetApiService } from './bet-api.service';

describe('BetApiService', () => {
  let service: BetApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BetApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
