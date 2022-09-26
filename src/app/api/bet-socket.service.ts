import { Injectable } from '@angular/core';
import * as io from 'socket.io-client';
import { HttpClient } from '@angular/common/http';
import { BetService } from '../services/bet.service';
import { environment } from 'src/environments/environment';
import { Bet } from '../../models/bet';
import { BasketService } from '../components/basket/basket.service';

@Injectable({
  providedIn: 'root'
})
export class BetSocketService {
  private socket: any;

  constructor(private http: HttpClient, private betService: BetService, private basketService: BasketService) {
    this.socket = io(environment.apiUrl);
    this.observeSocketEvent()
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

  private observeSocketEvent() {
    this.socket.on('bet-updated', (data: Bet[]) => {
      this.betService.syncBets(data)
      this.basketService.syncBasketsBets(data)
    })
  }
}
