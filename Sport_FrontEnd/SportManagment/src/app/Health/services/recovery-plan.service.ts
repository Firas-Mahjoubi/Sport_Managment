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


  getAllRecoveryPlans(): Observable<RecoveryPlan[]> {
    return this.http.get<RecoveryPlan[]>(`${this.apiUrl}/getAllRecoveryPlans`);
  }


  getRecoveryPlanById(recoveryPlanId: number): Observable<RecoveryPlan> {
    return this.http.get<RecoveryPlan>(`${this.apiUrl}/getRecoveryPlanById/${recoveryPlanId}`);
  }


  createRecoveryPlan(injuryId: number, recoveryPlan: RecoveryPlan): Observable<RecoveryPlan> {
    return this.http.post<RecoveryPlan>(`${this.apiUrl}/createRecoveryPlan/${injuryId}`, recoveryPlan);
  }



  updateRecoveryPlan(recoveryPlanId: number, recoveryPlan: RecoveryPlan): Observable<RecoveryPlan> {
    return this.http.post<RecoveryPlan>(`${this.apiUrl}/updateRecoveryPlan/${recoveryPlanId}`, recoveryPlan);
  }



  deleteRecoveryPlan(injuryId: number, recoveryPlanId: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/deleteRecoveryPlan/${injuryId}/${recoveryPlanId}`, { responseType: 'text' });
  }



  getRecoveryPlansByPlayerId(playerId: number): Observable<RecoveryPlan[]> {
    return this.http.get<RecoveryPlan[]>(`${this.apiUrl}/getRecoveryPlansByPlayerId/${playerId}`);
  }


  
  getInjuriesByPlayerId(playerId: number): Observable<Injury[]> {
    return this.http.get<Injury[]>(`${this.apiUrl}/getInjuriesByPlayerId/${playerId}`);
  }

}
