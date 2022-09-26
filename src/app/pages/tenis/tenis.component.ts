import { Component } from '@angular/core';
import { BetSocketService } from '../../../bet-socket.service';
import { BetService } from '../../bet.service';
import { BetPage } from '../generic/bet-page';


@Component({
  selector: 'bd-tenis',
  templateUrl: './tenis.component.html',
  styleUrls: ['./tenis.component.scss']
})
export class TenisComponent extends BetPage {
  constructor(protected socketService: BetSocketService, private betSerivce: BetService) {
    super(socketService, betSerivce)
    super.rate = 0.1;
  }
}