import { DecimalPipe } from "@angular/common";
import { Pipe, PipeTransform } from "@angular/core";

import { CartBet } from "src/models/cartBet";
import { DECIMAL_PIPE_ARG } from '../../configs/globals';

@Pipe({ name: 'cartBetWage' })
export class CartBetWagePipe implements PipeTransform {
  constructor(private numberPipe: DecimalPipe) {
  }
  transform(cartBet: CartBet): string {
    return this.getBetWage(cartBet)
  }

  private getBetWage(cartBet: CartBet) {
    let wage: number;
    switch (cartBet.betType) {
      case 0:
        wage = cartBet.bet.teams[0].win;
        break
      case 1:
        wage = cartBet.bet.draw;
        break
      case 2:
        wage = cartBet.bet.teams[1].win;
        break
      default:
        throw new Error('Incorrenct betType');
    }
    return this.numberPipe.transform(wage, DECIMAL_PIPE_ARG)
  }
}