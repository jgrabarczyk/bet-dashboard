import { Component } from '@angular/core';
import { BetPage } from '../generic/bet-page';
import { BetSocketService } from '../../api/bet-socket.service';
import { BetService } from '../../services/bet.service';


@Component({
  selector: 'bd-tenis',
  templateUrl: './tenis.component.html',
  styleUrls: ['./tenis.component.scss']
})
export class TenisComponent extends BetPage {
  constructor(protected socketService: BetSocketService, private betSerivce: BetService) {
    super(socketService, betSerivce)
    super.rate = 3;
  }
}