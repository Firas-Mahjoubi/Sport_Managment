import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Player } from '../models/player';

@Injectable({
  providedIn: 'root'
})
export class PlayerService {
  private baseUrl = 'http://localhost:8088/players';

  constructor(private http: HttpClient) {}


  getPlayers(): Observable<Player[]> {
    return this.http.get<Player[]>(`${this.baseUrl}/getallplayers`);
  }


  getPlayersWithoutHealthRecord(): Observable<Player[]> {
    return this.http.get<Player[]>(`${this.baseUrl}/players/without-healthrecord`);
  }




}
