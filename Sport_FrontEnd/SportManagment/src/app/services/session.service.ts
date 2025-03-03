import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SessionService {

  private apiUrl = 'http://localhost:8088/api/TrainingGround/AddTrainingSession';

  constructor(private http: HttpClient) { }

  // Méthode pour ajouter une session
  addSession(sessionData: any): Observable<any> {
    return this.http.post(this.apiUrl, sessionData);
  }
}
