import { Injectable } from '@angular/core';
import { take } from 'rxjs';
import { BetSocketService } from '../../../bet-socket.service';
@Injectable()
export class PageService {
  constructor(protected betSocketService: BetSocketService) {
  }

  start(rate?: number) {
    this.betSocketService.initializeSocketConnection(rate).pipe(take(1)).subscribe();
  }

  stop() {
    this.betSocketService.stopSocketConnection().pipe(take(1)).subscribe();
  }

  pull() {
    return this.betSocketService.subject
  }
}