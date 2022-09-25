import { DecimalPipe } from "@angular/common";
import { Pipe, PipeTransform } from "@angular/core";

import { CartBet } from "src/models/cartBet";
/*
 * Raise the value exponentially
 * Takes an exponent argument that defaults to 1.
 * Usage:
 *   value | exponentialStrength:exponent
 * Example:
 *   {{ 2 | exponentialStrength:10 }}
 *   formats to: 1024
*/
@Pipe({ name: 'formatCartBet' })
export class CartBetPipe implements PipeTransform {
  constructor(private numberPipe: DecimalPipe) {
  }
  transform(cartBet: CartBet): string {
    const wage = this.getBetWage(cartBet);

    return `${cartBet.bet.teams[0].name} - ${cartBet.bet.teams[1].name} | ${wage}`
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
    return this.numberPipe.transform(wage, '1.2-3')
  }
}