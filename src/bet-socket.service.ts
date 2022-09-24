import { Injectable } from '@angular/core';
import * as io from 'socket.io-client';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from './environments/environment';

@Injectable({
  providedIn: 'root'
})
export class BetSocketService {
  socket: any;
  constructor(private http: HttpClient) {
    this.socket = io(environment.apiUrl);
  }

  listenBetUpdate() {
    return new Observable((subscriber) => {
      this.socket.on('bet-updated', (data) => {
        subscriber.next(data);
      });
    });
  }

  initializeSocketConnection() {
    console.log(environment);

    return this.http.get(environment.apiUrl + '/pulling/start');
  }

  stopSocketConnection() {
    return this.http.get(environment.apiUrl + '/pulling/stop');
  }
}
