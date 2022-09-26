import { Pipe, PipeTransform } from "@angular/core";
import { CartBet } from "src/models/cartBet";

@Pipe({ name: 'cartBetTitle' })
export class CartBetTitlePipe implements PipeTransform {
  transform(cartBet: CartBet): string {
    return `${cartBet.bet.teams[0].name} - ${cartBet.bet.teams[1].name}`
  }

}