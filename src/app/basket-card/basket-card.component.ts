import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { BetService } from '../bet.service';
import { CartBet } from '../../models/cartBet';

@Component({
  selector: 'bd-basket-card',
  templateUrl: './basket-card.component.html',
  styleUrls: ['./basket-card.component.scss']
})
export class BasketCardComponent implements OnInit {
  cartBets$: Observable<CartBet[]>
  get wage() {
    return this.betService.currentWage;
  }

  constructor(private betService: BetService) { }

  ngOnInit(): void {
    this.cartBets$ = this.betService.currentBets
  }

}
