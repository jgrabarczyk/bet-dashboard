import { TestBed } from '@angular/core/testing';

import { BetsResolver } from './bets.resolver';

describe('BetsResolver', () => {
  let resolver: BetsResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    resolver = TestBed.inject(BetsResolver);
  });

  it('should be created', () => {
    expect(resolver).toBeTruthy();
  });
});
