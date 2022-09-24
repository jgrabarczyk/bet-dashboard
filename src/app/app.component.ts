import { Component, OnInit } from '@angular/core';
import { BetSocketService } from '../bet-socket.service';
import { environment } from '../environments/environment';

@Component({
  selector: 'bd-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  constructor(private betSocket: BetSocketService) { }
  env = environment;
  ngOnInit() {
    this.betSocket.listenBetUpdate().subscribe((res: any) => {
      console.log(res);
    });
  }

  start() {
    this.betSocket.initializeSocketConnection().subscribe();
  }
  stop() {
    this.betSocket.stopSocketConnection().subscribe();
  }
}
