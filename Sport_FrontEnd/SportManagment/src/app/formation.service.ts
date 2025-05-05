import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FormationService {

  private apiUrl = 'http://localhost:8088/api/tactics/formation-percentage'; // Replace with your backend URL

  constructor(private http: HttpClient) { }

  getFormationPercentage(): Observable<Map<string, number>> {
    return this.http.get<Map<string, number>>(this.apiUrl);
  }
  getTrainingFocusData(): Observable<any> {
    return this.http.get<any>('http://localhost:8088/api/tactics/formation-percentage-by-focus'); // Replace with your backend URL
  }
  

}
