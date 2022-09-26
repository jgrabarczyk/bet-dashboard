import { Component } from '@angular/core';
import { BetPage } from '../generic/bet-page';
import { BetSocketService } from '../../api/bet-socket.service';
import { BetService } from '../../services/bet.service';


@Component({
  selector: 'bd-basketball',
  templateUrl: './basketball.component.html',
  styleUrls: ['./basketball.component.scss']
})
export class BasketballComponent extends BetPage {
  constructor(protected socketService: BetSocketService, private betSerivce: BetService) {
    super(socketService, betSerivce)
    super.rate = 1;
  }
}
