import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Bet } from 'src/models/bet';
import { CartBet } from 'src/models/cartBet';
import { SidenavService } from './sidenav/sidenav.service';
import { SnackbarService } from './snackbar.service';

@Injectable({
  providedIn: 'root'
})
export class BetService {
  private bets$_: BehaviorSubject<Bet[]> = new BehaviorSubject([]);
  private cartBets$_: BehaviorSubject<CartBet[]> = new BehaviorSubject([]);
  private currentWage$: BehaviorSubject<number> = new BehaviorSubject(1);

  constructor(private snackbarService: SnackbarService, private sidenavService: SidenavService) { }

  get bets$() {
    return this.bets$_.asObservable();
  }
  get cartBets$() {
    return this.cartBets$_.asObservable()
  }

  get basketWage() {
    return this.currentWage$.value
  }

  /**
   * add cartBet to cartBets$_ 
   * if cartBet with same betType exists show snackbar alert
   * if cartBet exists in carBets$_ but is different type update cartBet and show snackbar info
   * if cartBet not exist in carBets$_ add it to list  and show snackbar info. 
   */
  placeBet(newCartBet: CartBet) {
    const betFromBasket = this.getFromBasket(newCartBet.bet.id);
    const sameType = newCartBet.betType === betFromBasket?.betType;

    if (!!betFromBasket && sameType) {
      this.snackbarService.alert('snackbar.alert.alreadyInBasket')
      return
    }

    if (betFromBasket) {
      this.removeBetById(newCartBet.bet.id);
      this.recalculateWages()
    }

    this.snackbarService.info(betFromBasket ? 'snackbar.info.betUpdated' : 'snackbar.info.betPlaced')

    const bets = this.cartBets$_.value;
    this.cartBets$_.next([...bets, newCartBet])
    this.recalculateWage(newCartBet)
  }

  removeBetById(id: number) {
    const bets = this.cartBets$_.value;
    this.cartBets$_.next(bets.filter(currentCartBet => currentCartBet.bet.id !== id));
    this.recalculateWages();
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
    this.updateBasketsBets(bets)
  }

  setBets(bets: Bet[]) {
    this.bets$_.next(bets);
  }

  /**
   * update basket bets accodrinly to new data 
   */
  private updateBasketsBets(bets: Bet[]) {
    const updatedBets = []

    this.cartBets$_.value.forEach(cartBet => {
      const index = bets.findIndex(bet => cartBet.bet.id == bet.id)
      const updatedBet = index !== -1 ? { bet: bets[index], betType: cartBet.betType } : cartBet
      updatedBets.push(updatedBet);
    })

    this.cartBets$_.next(updatedBets)
    this.recalculateWages();
  }

  private recalculateWages() {
    this.currentWage$.next(1);
    this.cartBets$_.value.forEach(bet => {
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

  private getFromBasket(id: number) {
    return this.cartBets$_.value.find(v => v.bet.id === id)
  }
}
