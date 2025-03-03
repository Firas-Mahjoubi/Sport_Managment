import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TrainingSessionService {
  private apiUrl = 'http://localhost:8088/api/TrainingGround';

  constructor(private http: HttpClient) {}

  // ✅ Get all training sessions
  getTrainingSessions(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/getTrainingSession`);
  }

  getAllSessions(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/getTrainingSession`);
  }
  

    // // ✅ Fetch a session by ID
    // getTrainingSessionById(id: number): Observable<any> {
    //   return this.http.get<any>(`${this.apiUrl}/getTrainingSession/${id}`);
    // }

   // ✅ Fetch session by ID
   getTrainingSessionById(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/getTrainingSession/${id}`);
  }
     // ✅ Create Training Session
  createSession(trainingSession: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/AddTrainingSession`, trainingSession);
  }
     // ✅ Update existing session
  updateSession(id: number, session: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/updateTrainingSession/${id}`, session);
  }

  // ✅ Get all exercises
  getAllExercises(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/getExercices`);
  }

  // ✅ Add exercises to a session
  addExercisesToSession(sessionId: number, exerciceIds: number[]): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/${sessionId}/add-exercises`, exerciceIds);
  }

  //Add Players to a session
  addPlayersToSession(sessionId: number, playerIds: number[]): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/${sessionId}/add-players`, playerIds);
  }
}
