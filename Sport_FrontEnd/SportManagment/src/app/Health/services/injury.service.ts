import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Injury } from '../models/injury';

@Injectable({
  providedIn: 'root'
})
export class InjuryService {
  private apiUrl = 'http://localhost:8088/api/injuries';

  constructor(private http: HttpClient) { }

  getInjuries(): Observable<Injury[]> {
    return this.http.get<Injury[]>(`${this.apiUrl}/getAllInjuries`);
  }

  getInjuryById(id: number): Observable<Injury> {
    return this.http.get<Injury>(`${this.apiUrl}/getInjuryById/${id}`);
  }

  addInjury(injury: Injury): Observable<Injury> {
    return this.http.post<Injury>(`${this.apiUrl}/createInjury/${injury.player.id}`, injury);
  }

  updateInjury(id: number, injury: Injury): Observable<Injury> {
    return this.http.put<Injury>(`${this.apiUrl}/updateInjury/${id}`, injury);
  }

  deleteInjury(injuryId: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/injury/${injuryId}/archive`, { responseType: 'text' as 'json' });
  }


  getArchivedInjuries(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/archived-injuries`);
  }



  archiveInjury(injuryId: number) {
    return this.http.delete<{ message: string }>(`http://localhost:8088/api/injuries/injury/${injuryId}/archive`);
  }


}
