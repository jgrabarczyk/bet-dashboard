import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Bet } from 'src/models/bet';

@Injectable({
  providedIn: 'root'
})
export class BetService {
  private bets$_: BehaviorSubject<Bet[]> = new BehaviorSubject([]);

  get bets$() {
    return this.bets$_.asObservable();
  }

  /**
   * Update loaded bets accodrinly to new data
   */
  syncBets(bets: Bet[]) {
    const updatedBets = [];

    this.bets$_.value.forEach(currentBet => {
      const index = bets.findIndex(bet => currentBet.id == bet.id)
      const updatedBet = index !== -1 ? bets[index] : currentBet
      updatedBets.push(updatedBet);
    })

    this.bets$_.next(updatedBets)
  }

  setBets(bets: Bet[]) {
    this.bets$_.next(bets);
  }

}
