import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Team } from '../models/team.model';


@Injectable({
  providedIn: 'root'
})
export class TeamService {

  private apiUrl = 'http://localhost:8088/teams';
  constructor(private http: HttpClient) { }

//get all teams
  getAll(): Observable<Team[]> {
    return this.http.get<Team[]>(`${this.apiUrl}/getallteams`);
  }


//get byid
  getById(id: number): Observable<Team> {
    return this.http.get<Team>(`${this.apiUrl}/getteam/${id}`);
  }

  //ajoutteams
  create(team: Team): Observable<Team> {
    return this.http.post<Team>(this.apiUrl+"/addteam", team);
  }

  //modifier teams
  update(id: number, team: Team): Observable<Team> {
    return this.http.put<Team>(`${this.apiUrl}/updateteams/${id}`, team);
  }

  //supprimer teams
  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/delete/${id}`);
  }
}
