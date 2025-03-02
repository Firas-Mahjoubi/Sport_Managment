import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { League } from '../models/league.model';


@Injectable({
  providedIn: 'root'
})
export class LeagueService {
  private apiUrl = 'http://localhost:8088/leagues';

  constructor(private http: HttpClient) { }

//getall league
  getAll(): Observable<League[]> {
    return this.http.get<League[]>(`${this.apiUrl}/getallleague`);
    
  }

//getleague by id
  getById(id: number): Observable<League> {
    return this.http.get<League>(`${this.apiUrl}/getleague/${id}`);
  }

//ajouter league
  create(league: League): Observable<League> {
    return this.http.post<League>(this.apiUrl+"/addleague", league);
  }

//modifier league
  update(id: number, league: League): Observable<League> {
    return this.http.put<League>(`${this.apiUrl}/update/${id}`, league);
  }

//supprimer league
  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/deleteleague/${id}`);
  }
}
