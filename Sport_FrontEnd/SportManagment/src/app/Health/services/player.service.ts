import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Player } from '../models/player';

@Injectable({
  providedIn: 'root'
})
export class PlayerService {
  private baseUrl = 'http://localhost:8088';

  constructor(private http: HttpClient) {}

  // ✅ Récupère tous les joueurs
  getPlayers(): Observable<Player[]> {
    return this.http.get<Player[]>(`${this.baseUrl}/getallplayers`);
  }

  // ✅ Récupère les joueurs sans HealthRecord
  getPlayersWithoutHealthRecord(): Observable<Player[]> {
    return this.http.get<Player[]>(`${this.baseUrl}/players/without-healthrecord`);
  }
}
