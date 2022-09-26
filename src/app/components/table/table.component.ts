import { Component, Input } from '@angular/core';
import { Bet } from 'src/models/bet';
import { BetType } from 'src/models/betType';
import { BasketService } from '../basket/basket.service';

@Component({
  selector: 'bd-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent {
  @Input() data: Bet[];
  displayedColumns: string[] = ['team1', 'win1', 'draw', 'win2', 'team2'];

  constructor(private basketService: BasketService) {
  }

  placeBet(bet: Bet, betType: BetType) {
    this.basketService.placeBet({ bet, betType })
  }
}
