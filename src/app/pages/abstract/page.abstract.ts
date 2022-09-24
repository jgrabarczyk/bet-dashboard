import { Component } from "@angular/core";
import { Bet } from "src/models/bet";
import { untilDestroyed, UntilDestroy } from '@ngneat/until-destroy';
import { BetSocketService } from "src/bet-socket.service";

@UntilDestroy()
@Component({ template: '' })
export class Page {
  private data_: Bet[];
  protected rate = 0.01
  constructor(protected socketService: BetSocketService) { }

  get data() {
    return this.data_
  }

  ngOnInit(): void {
    this.socketService.initializeSocketConnection(this.rate).subscribe();

    this.socketService.subject.pipe(untilDestroyed(this)).subscribe({
      next: data => this.data_ = data
    })

  }

  ngOnDestroy() {
    this.socketService.stopSocketConnection().subscribe();
  }
}