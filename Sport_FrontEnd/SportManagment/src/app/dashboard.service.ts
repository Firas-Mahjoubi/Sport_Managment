// dashboard.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  private apiUrl = 'http://localhost:8088/users/dashboard';  // Update the API endpoint if needed

  constructor(private http: HttpClient) { }

  // Fetch user data from the backend
  getUserDashboardData(): Observable<any> {
    return this.http.get<any>(this.apiUrl); // Making the GET request to the backend API
  }
}
