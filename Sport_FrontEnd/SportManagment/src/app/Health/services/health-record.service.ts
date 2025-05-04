import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { HealthRecord } from '../models/HealthRecord';
import { Player } from '../models/player';

@Injectable({
  providedIn: 'root'
})
export class HealthRecordService {
  private apiUrl = 'http://localhost:8088/api/health'; // 📌 Adapte selon ton backend



  constructor(private http: HttpClient) {}


  getAllHealthRecords(): Observable<HealthRecord[]> {
    return this.http.get<HealthRecord[]>(`${this.apiUrl}/getAllHealthRecords`);
  }


  getHealthRecordById(id: number): Observable<HealthRecord> {
    return this.http.get<HealthRecord>(`${this.apiUrl}/getHealthRecordById/${id}`);
  }


  getPlayerByHealthRecord(healthRecordId: number): Observable<Player> {
    return this.http.get<Player>(`${this.apiUrl}/getPlayerByHealthRecord/${healthRecordId}`);
  }


  createHealthRecord(playerId: number, healthRecord: HealthRecord): Observable<HealthRecord> {
    return this.http.post<HealthRecord>(`${this.apiUrl}/createHealthRecord/${playerId}`, healthRecord);
  }


  updateHealthRecord(id: number, healthRecord: HealthRecord): Observable<HealthRecord> {
    return this.http.put<HealthRecord>(`${this.apiUrl}/updateHealthRecord/${id}`, healthRecord);
  }


  deleteHealthRecord(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/deleteHealthRecord/${id}`);
  }

// 🔥 Nouvelle méthode pour récupérer par playerId
getHealthRecordByPlayerId(playerId: number): Observable<HealthRecord> {
  return this.http.get<HealthRecord>(`${this.apiUrl}/getHealthRecordByPlayerId/${playerId}`);
}



}
