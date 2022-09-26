import { Component } from '@angular/core';
import { BasketService } from './basket.service';

@Component({
  selector: 'bd-basket',
  templateUrl: './basket.component.html',
  styleUrls: ['./basket.component.scss']
})
export class BasketComponent {

  get isBasketCardVisible() {
    return this.basketService.isBasketCardVisible
  }

  constructor(private basketService: BasketService) { }

  openBasket() {
    this.basketService.openBasket()
  }

}
