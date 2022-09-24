import { Component } from '@angular/core';
import { Page } from '../abstract/page.abstract';
import { PageService } from '../abstract/page.service';
import { BetSocketService } from '../../../bet-socket.service';

@Component({
  selector: 'bd-basketball',
  templateUrl: './basketball.component.html',
  styleUrls: ['./basketball.component.scss']
})
export class BasketballComponent extends Page {
  constructor(protected socketService: BetSocketService) {
    super(socketService)
    super.rate = 0.001;
  }
}
