import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { BetService } from '../bet.service';
import { CartBet } from '../../models/cartBet';
import { DECIMAL_PIPE_ARG } from '../../configs/globals';
import { BasketService } from '../basket/basket.service';

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
    return this.betService.basketWage
  }

  get totalAmount() {
    return this.wage * this.amount * 0.88;
  }

  constructor(private betService: BetService, private basketService: BasketService) { }

  ngOnInit(): void {
    this.cartBets$ = this.betService.cartBets$
  }

  remove(cartBet: CartBet) {
    this.betService.removeBetById(cartBet.bet.id)
  }
}
