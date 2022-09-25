import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Bet } from 'src/models/bet';
import { CartBet } from 'src/models/cartBet';

@Injectable({
  providedIn: 'root'
})
export class BetService {
  private currentBets$: BehaviorSubject<CartBet[]> = new BehaviorSubject([]);
  private currentWage$: BehaviorSubject<number> = new BehaviorSubject(1);
  constructor() { }

  get currentBets() {
    return this.currentBets$.asObservable()
  }

  get currentWage() {
    return this.currentWage$.value;
  }

  placeBet(cartBet: CartBet) {
    if (this.isDuplicate(cartBet.bet.id)) {
      return
    }

    const bets = this.currentBets$.value;
    this.currentBets$.next([...bets, cartBet])
    this.recalculateWage(cartBet)
  }

  updateBets(bets: Bet[]) {
    const updatedBets = []

    this.currentBets$.value.forEach(cartBet => {
      const index = bets.findIndex(bet => cartBet.bet.id == bet.id)
      const updatedBet = index !== -1 ? { bet: bets[index], betType: cartBet.betType } : cartBet
      updatedBets.push(updatedBet);
    })

    this.currentBets$.next(updatedBets)
    this.updateWage();
  }

  private updateWage() {
    this.currentWage$.next(1);
    this.currentBets$.value.forEach(bet => {
      this.recalculateWage(bet);
    })
  }

  private recalculateWage(cartBet: CartBet) {
    const newBetWage = this.getBetWage(cartBet)
    const currentWage = this.currentWage$.value
    this.currentWage$.next(newBetWage * currentWage);
  }

  private getBetWage(cartBet: CartBet) {
    switch (cartBet.betType) {
      case 0:
        return cartBet.bet.teams[0].win;
      case 1:
        return cartBet.bet.draw;
      case 2:
        return cartBet.bet.teams[1].win;
      default:
        throw new Error('Incorrenct betType');
    }
  }

  private isDuplicate(id: number) {
    return this.currentBets$.value.map(v => v.bet.id).includes(id)
  }
}
