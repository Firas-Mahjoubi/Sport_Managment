import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { RecoveryPlan } from '../models/recoveryplan';
import { Injury } from '../models/injury';

@Injectable({
  providedIn: 'root'
})
export class RecoveryPlanService {

  private apiUrl = 'http://localhost:8088/api/recovery-plans';

  constructor(private http: HttpClient) { }

  // ✅ Récupérer tous les RecoveryPlans
  getAllRecoveryPlans(): Observable<RecoveryPlan[]> {
    return this.http.get<RecoveryPlan[]>(`${this.apiUrl}/getAllRecoveryPlans`);
  }

  // ✅ Récupérer un plan par son ID
  getRecoveryPlanById(recoveryPlanId: number): Observable<RecoveryPlan> {
    return this.http.get<RecoveryPlan>(`${this.apiUrl}/getRecoveryPlanById/${recoveryPlanId}`);
  }

  // ✅ Créer un nouveau plan pour une blessure donnée (injuryId)
  createRecoveryPlan(injuryId: number, recoveryPlan: RecoveryPlan): Observable<RecoveryPlan> {
    return this.http.post<RecoveryPlan>(`${this.apiUrl}/createRecoveryPlan/${injuryId}`, recoveryPlan);
  }

  
  // ✅ Mettre à jour un plan existant
  updateRecoveryPlan(recoveryPlanId: number, recoveryPlan: RecoveryPlan): Observable<RecoveryPlan> {
    return this.http.post<RecoveryPlan>(`${this.apiUrl}/updateRecoveryPlan/${recoveryPlanId}`, recoveryPlan);
  }


  // ✅ Supprimer un RecoveryPlan lié à une blessure donnée
  deleteRecoveryPlan(injuryId: number, recoveryPlanId: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/deleteRecoveryPlan/${injuryId}/${recoveryPlanId}`, { responseType: 'text' });
  }


  // ✅ Récupérer tous les RecoveryPlans d’un joueur donné
  getRecoveryPlansByPlayerId(playerId: number): Observable<RecoveryPlan[]> {
    return this.http.get<RecoveryPlan[]>(`${this.apiUrl}/getRecoveryPlansByPlayerId/${playerId}`);
  }


  // ✅ Récupérer toutes les blessures d’un joueur (utile pour la sélection)
  getInjuriesByPlayerId(playerId: number): Observable<Injury[]> {
    return this.http.get<Injury[]>(`${this.apiUrl}/getInjuriesByPlayerId/${playerId}`);
  }

}
