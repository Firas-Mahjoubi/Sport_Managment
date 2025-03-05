import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SessionService {
  private apiUrl = 'http://localhost:8088/api/TrainingGround';

  constructor(private http: HttpClient) { }


  addSession(sessionData: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/AddTrainingSession`, sessionData);
  }


  getSessionById(id: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/getTrainingSession/${id}`);
  }

  getAllSessions(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/getTrainingSession`);
  }

  deleteSession(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/deleteTrainingSession/${id}`);
  }

  updateSession(sessionData: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/updateTrainingSession`, sessionData);
  }
}
