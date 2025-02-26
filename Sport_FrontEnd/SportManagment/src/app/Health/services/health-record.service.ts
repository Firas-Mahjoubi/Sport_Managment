import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


import { HealthRecord } from '../models/HealthRecord';

@Injectable({
  providedIn: 'root'
})
export class HealthRecordService {
  private apiUrl = 'http://localhost:8088/api/health'; // 📌 Adapte selon ton backend

  constructor(private http: HttpClient) {}

  // 📥 Récupérer tous les HealthRecords
  getAllHealthRecords(): Observable<HealthRecord[]> {
    return this.http.get<HealthRecord[]>(`${this.apiUrl}/getAllHealthRecords`);
  }

  // 🔍 Récupérer un HealthRecord par ID
  getHealthRecordById(id: number): Observable<HealthRecord> {
    return this.http.get<HealthRecord>(`${this.apiUrl}/getHealthRecordById/${id}`);
  }

  // ➕ Ajouter un HealthRecord pour un joueur spécifique
  createHealthRecord(playerId: number, healthRecord: HealthRecord): Observable<HealthRecord> {
    return this.http.post<HealthRecord>(`${this.apiUrl}/createHealthRecord/${playerId}`, healthRecord);
  }

  // ✏️ Mettre à jour un HealthRecord
  updateHealthRecord(id: number, healthRecord: HealthRecord): Observable<HealthRecord> {
    return this.http.put<HealthRecord>(`${this.apiUrl}/updateHealthRecord/${id}`, healthRecord);
  }

  // 🗑️ Supprimer un HealthRecord
  deleteHealthRecord(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/deleteHealthRecord/${id}`);
  }
}
