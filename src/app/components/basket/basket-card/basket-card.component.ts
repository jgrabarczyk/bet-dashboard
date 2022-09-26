import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { DECIMAL_PIPE_ARG, TAX_RATE } from 'src/configs/globals';
import { CartBet } from 'src/models/cartBet';

import { BasketService } from '../basket.service';

@Component({
  selector: 'bd-basket-card',
  templateUrl: './basket-card.component.html',
  styleUrls: ['./basket-card.component.scss']
})
export class BasketCardComponent implements OnInit {
  DECIMAL_PIPE_ARG = DECIMAL_PIPE_ARG
  cartBets$: Observable<CartBet[]>

  get amount() {
    return this.basketService.amount
  }

  set amount(newAmount) {
    this.basketService.amount = newAmount;
  }

  get isDefaultWage() {
    return this.wage === 1
  }

  get wage() {
    return this.basketService.basketWage
  }

  get totalAmount() {
    return this.basketService.betTotalValue;
  }

  get taxRate() {
    return TAX_RATE * 100
  }

  constructor(private basketService: BasketService) { }

  ngOnInit(): void {
    this.cartBets$ = this.basketService.cartBets$
  }

  remove(cartBet: CartBet) {
    this.basketService.removeBetById(cartBet.bet.id)
  }

  submit() {
    this.basketService.submit();
  }
}
