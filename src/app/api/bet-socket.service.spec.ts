import { TestBed } from '@angular/core/testing';

import { BetSocketService } from './bet-socket.service';

describe('SocketService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: BetSocketService = TestBed.get(BetSocketService);
    expect(service).toBeTruthy();
  });
});
