import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Player } from '../models/player.model';

@Injectable({
  providedIn: 'root'
})

export class PlayerService {

  private apiUrl = 'http://localhost:8088/players';
  constructor(private http: HttpClient) { }

//get all player
  getAll(): Observable<Player[]> {
    return this.http.get<Player[]>(`${this.apiUrl}/getallplayers`);
  }
  
//getplayerbyid
  getById(id: number): Observable<Player> {
    return this.http.get<Player>(`${this.apiUrl}/getplayer/${id}`);
  }

//ajouter un player
  create(player: Player): Observable<Player> {
    return this.http.post<Player>(this.apiUrl+"/addplayer", player);
  }

//modifier un player
  update(id: number, player: Player): Observable<Player> {
    return this.http.put<Player>(`${this.apiUrl}/updateplayer/${id}`, player);
  }

//supprimer un player
  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/deleteplayer/${id}`);
  }
}
