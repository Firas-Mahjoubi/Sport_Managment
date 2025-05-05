import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StatisticsService {
  private apiUrl = 'http://localhost:8088/players/players-per-team';

  constructor(private http: HttpClient) {}

  getPlayersPerTeam(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }
}
