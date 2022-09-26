import { Injectable } from '@angular/core';
import {
  Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { Observable, tap } from 'rxjs';
import { Bet } from 'src/models/bet';
import { BetApiService } from '../api/bet-api.service';
import { BetService } from './bet.service';

@Injectable({
  providedIn: 'root'
})
export class BetsResolver implements Resolve<Bet[]> {
  constructor(private betsApi: BetApiService, private betService: BetService) {
  }

  resolve(_: ActivatedRouteSnapshot, __: RouterStateSnapshot): Observable<Bet[]> {
    return this.betsApi.getAllBets().pipe(tap(
      bets => this.betService.setBets(bets)
    ));
  }
}
