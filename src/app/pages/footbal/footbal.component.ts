import { Component } from '@angular/core';
import { BetPage } from '../generic/bet-page';

import { UntilDestroy } from '@ngneat/until-destroy';
import { BetSocketService } from '../../api/bet-socket.service';
import { BetService } from '../../services/bet.service';

@UntilDestroy()
@Component({
  selector: 'bd-footbal',
  templateUrl: './footbal.component.html',
  styleUrls: ['./footbal.component.scss']
})
export class FootbalComponent extends BetPage {
  constructor(protected socketService: BetSocketService, private betSerivce: BetService) {
    super(socketService, betSerivce)
    super.rate = 0.1;
  }
}