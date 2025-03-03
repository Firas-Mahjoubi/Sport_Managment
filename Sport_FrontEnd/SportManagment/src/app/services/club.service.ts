import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Club } from '../models/club.model';

@Injectable({
  providedIn: 'root'
})
export class ClubService {
  private apiUrl = 'http://localhost:8088/clubs';

  constructor(private http: HttpClient) { }

  //recuperer tous les clubs
  getAll() : Observable<Club[]> {

  return this.http.get<Club[]>(`${this.apiUrl}/getAllClubs`);
  }

  //recuperer un club par ID
  getById(id: number): Observable<Club> {
    return this.http.get<Club>(`${this.apiUrl}/getClubById/${id}`);
  }

  //Ajouter un club

  create(club: Club): Observable<Club> {
    console.log("✅ Sending Club to Backend:", club);
    return this.http.post<Club>(this.apiUrl+"/addClub", club);
  }

  //modifier un club
  update(id: number, club: Club): Observable<Club> {
    return this.http.put<Club>(`${this.apiUrl}/updateClub/${id}`, club);
  }

  //supprimer un club
  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/deleteClub/${id}`);
  }
}
