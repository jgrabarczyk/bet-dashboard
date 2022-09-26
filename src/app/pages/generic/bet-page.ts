import { Component } from "@angular/core";
import { BetSocketService } from "src/bet-socket.service";
import { BetService } from '../../bet.service';

@Component({ template: '' })
export class BetPage {
  protected rate = 0.01
  constructor(protected socketService: BetSocketService, protected betService: BetService) { }

  get data() {
    return this.betService.bets$
  }

  ngOnInit(): void {
    this.socketService.initializeSocketConnection(this.rate).subscribe();
  }

  ngOnDestroy() {
    this.socketService.stopSocketConnection().subscribe();
  }
}