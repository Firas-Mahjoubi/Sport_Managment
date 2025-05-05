import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Club {
  id: number;  // "?" signifie que c'est optionnel
  name: string;
  location: string;
  stadiumName: string;
  foundationYear: string;  // Format YYYY-MM-DD
  clubLogo: string;
  imageUrl: string;
  leagues: string[];
}

export interface ClubRequest {
  name: string;
  location: string;
  stadiumName: string;
  foundationYear: string; // Format ISO ex: '2025-04-27'
  imageUrl1: File; // ✅ Doit correspondre exactement au nom du champ backend
}


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

  addClub(formData: FormData): Observable<any> {
    return this.http.post(`http://localhost:8088/clubs/addClub`, formData);
  }
  

  //modifier un club
  update(id: number, formData: FormData): Observable<any> {
    return this.http.put(`http://localhost:8088/clubs/updateClub/${id}`, formData);
  }

  //supprimer un club
  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/deleteClub/${id}`);
  }
//recherche 
searchClubs(keyword: string): Observable<Club[]> {
  return this.http.get<Club[]>(`http://localhost:8088/clubs/search?keyword=${keyword}`);
}


//fichier CSV
downloadClubsCsv() {
  return this.http.get('http://localhost:8088/clubs/export/csv', { responseType: 'blob' });
}

//pfd
downloadClubPdf(id: number) {
  return this.http.get(`http://localhost:8088/clubs/export/pdf/${id}`, { responseType: 'blob' });
}
///////////
/*getClubsByCoachId(userId: number) {
  return this.http.get<Club[]>(`http://localhost:8088/api/clubs/byCoach/${userId}`);
}*/
///
getClubsByCoach(userId: number): Observable<Club[]> {
  return this.http.get<Club[]>(`${this.apiUrl}/byCoach/${userId}`);
}



  
}
