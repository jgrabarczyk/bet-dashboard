import { Component, OnInit } from '@angular/core';
import { Page } from '../abstract/page.abstract';
import { PageService } from '../abstract/page.service';
import { UntilDestroy } from '@ngneat/until-destroy';
import { BetSocketService } from '../../../bet-socket.service';

@UntilDestroy()
@Component({
  selector: 'bd-footbal',
  templateUrl: './footbal.component.html',
  styleUrls: ['./footbal.component.scss']
})
export class FootbalComponent extends Page {
  constructor(protected socketService: BetSocketService) {
    super(socketService)
    super.rate = 0.1;
  }
}