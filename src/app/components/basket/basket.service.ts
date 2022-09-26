import { Injectable } from "@angular/core";
import { BasketCardComponent } from "./basket-card/basket-card.component";
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { BehaviorSubject } from "rxjs";
import { CartBet } from "src/models/cartBet";
import { Bet } from './../../../models/bet';
import { BreakpointService } from './../../services/breakpoint-service';
import { SnackbarService } from "./../../services/snackbar.service";
import { DECIMAL_PIPE_ARG, TAX_RATE } from '../../../configs/globals';
import { DecimalPipe } from "@angular/common";

@Injectable()
export class BasketService {
  amount = 5;
  private cartBets$_: BehaviorSubject<CartBet[]> = new BehaviorSubject([]);
  private currentWage$: BehaviorSubject<number> = new BehaviorSubject(1);

  get cartBets$() {
    return this.cartBets$_.asObservable()
  }

  get isBasketCardVisible() {
    return !this.breakpointService.isMobile && !this.breakpointService.isTablet
  }

  get basketWage() {
    return this.currentWage$.value
  }

  get betTotalValue() {
    return this.basketWage * this.amount * (1 - TAX_RATE);
  }

  constructor(
    private breakpointService: BreakpointService,
    private bottomSheetRef_: MatBottomSheet,
    private snackbarService: SnackbarService,
    private numberPipe: DecimalPipe
  ) { }

  openBasket() {
    this.bottomSheetRef_.open(BasketCardComponent, {
      panelClass: 'basket'
    })
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


  syncBasketsBets(bets: Bet[]) {
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

  submit() {
    const totalValue = this.numberPipe.transform(this.betTotalValue, DECIMAL_PIPE_ARG)
    this.snackbarService.info({ message: 'snackbar.info.submited', params: { betValue: totalValue } });
    this.bottomSheetRef_.dismiss();
    this.cartBets$_.next([]);
  }
}