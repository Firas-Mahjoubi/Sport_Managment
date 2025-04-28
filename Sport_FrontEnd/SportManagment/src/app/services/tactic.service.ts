import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Tactic {
  id?: number;
  name: string;
  description: string;
  formation: string;
  trainingFocus: string;
  teamId?: number; // Added to send team info when creating a tactic
  userId?: string; // Added userId to send user info when creating a tactic
}

@Injectable({
  providedIn: 'root'
})
export class TacticService {
  private apiUrl = 'http://localhost:8088/api/tactics';

  constructor(private http: HttpClient) {}

  /**
   * Get all tactics
   */
  getAllTactics(): Observable<Tactic[]> {
    return this.http.get<Tactic[]>(`${this.apiUrl}`);
  }

  /**
   * Get tactics by team
   * @param teamId - The ID of the team
   */
  getTacticsByTeam(teamId: number): Observable<Tactic[]> {
    return this.http.get<Tactic[]>(`${this.apiUrl}/team/${teamId}`);
  }

  /**
   * Create a new tactic
   * @param tactic - The tactic object
   * @param teamId - The team ID associated with the tactic
   * @param userId - The user ID of the person creating the tactic
   */
  createTactic(tactic: Tactic, teamId: number, userId: string): Observable<Tactic> {
    // Add the userId to the tactic object
    tactic.userId = userId;

    return this.http.post<Tactic>(`${this.apiUrl}/createTactic/${teamId}/${userId}`, tactic, {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    });
  }

  /**
   * Update an existing tactic
   * @param id - The ID of the tactic
   * @param tactic - The updated tactic object
   */
  updateTactic(id: number, tactic: Tactic): Observable<Tactic> {
    return this.http.put<Tactic>(`${this.apiUrl}/updateTactic/${id}`, tactic);
  }

  /**
   * Delete a tactic by ID
   * @param id - The ID of the tactic
   */
  deleteTactic(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/deleteTactic/${id}`);
  }
  getTacticsByUserId(userId: number): Observable<Tactic[]> {
    return this.http.get<Tactic[]>(`${this.apiUrl}/user/${userId}`);
  }

}
