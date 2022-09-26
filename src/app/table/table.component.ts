import { Component, Input } from '@angular/core';
import { Bet } from 'src/models/bet';
import { BetType } from 'src/models/betType';
import { BetService } from '../bet.service';

@Component({
  selector: 'bd-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent {
  @Input() data: Bet[];
  displayedColumns: string[] = ['team1', 'win1', 'draw', 'win2', 'team2'];

  constructor(private betService: BetService) {
  }


  placeBet(bet: Bet, betType: BetType) {
    this.betService.placeBet({ bet, betType })
  }
}
