import { Injectable } from '@angular/core';
import * as io from 'socket.io-client';
import { Observable, Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from './environments/environment';
import { Bet } from './models/bet';
import { BetService } from './app/bet.service';

@Injectable({
  providedIn: 'root'
})
export class BetSocketService {
  private socket: any;
  private subject_ = new Subject<Bet[]>();
  constructor(private http: HttpClient, private betService: BetService) {
    this.socket = io(environment.apiUrl);
    this.socket.on('bet-updated', (data: Bet[]) => {
      this.betService.updateBets(data)
      this.subject_.next(data);
    })
  }

  get subject() {

    return this.subject_;
  }

  initializeSocketConnection(rate: number = 0.001) {
    const params = {
      rate
    }
    return this.http.get(environment.apiUrl + '/pulling/start', { params });
  }

  stopSocketConnection() {
    return this.http.get(environment.apiUrl + '/pulling/stop');
  }

}
