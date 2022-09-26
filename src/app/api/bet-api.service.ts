import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Bet } from '../../models/bet';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class BetApiService {

  constructor(private http: HttpClient) { }

  getAllBets() {
    return this.http.get<Bet[]>(environment.apiUrl + '/bets')
  }

  getBet(id: number) {
    return this.http.get<Bet[]>(environment.apiUrl + `/bets/${id}`)
  }

  generateBets(size = 1) {
    return this.http.get<Bet[]>(environment.apiUrl + 'bets-generate/', {
      params: {
        size
      }
    })
  }
}
