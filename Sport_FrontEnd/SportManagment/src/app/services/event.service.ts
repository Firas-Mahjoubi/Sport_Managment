import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EventService {
  private apiUrl = 'http://localhost:8088';

  constructor(private http: HttpClient) {}

  getEvents(): Observable<Event[]> {
    return this.http.get<Event[]>(`${this.apiUrl}/getEvent`);
  }

  addEvent(eventData: Event): Observable<Event> {
    return this.http.post<Event>(`${this.apiUrl}/addEvent`, eventData);
  }

  updateEvent(eventData: Event): Observable<Event> {
    return this.http.put<Event>(`${this.apiUrl}/updateEvent`, eventData);
  }

  getEventById(idEvent: number): Observable<Event> {
    return this.http.get<Event>(`${this.apiUrl}/getEventById/${idEvent}`);
  }

  
removeEvent(idEvent: number): Observable<void> {
  return this.http.delete<void>(`${this.apiUrl}/removeEventById/${idEvent}`);
}




}

// Interface pour représenter un événement
export interface Event {
  idEvent?: number; // ID optionnel pour les nouveaux événements
  nameEvent: string;
  description: string;
  date: string; // Format de date : "YYYY-MM-DD"
  address: string;
  typeEvent: string;
}
