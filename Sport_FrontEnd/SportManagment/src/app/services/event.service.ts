import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EventService {
  private apiUrl = 'http://localhost:8088'; // URL de base de votre backend

  constructor(private http: HttpClient) {}

  // Méthode pour récupérer tous les événements
  getEvents(): Observable<Event[]> {
    return this.http.get<Event[]>(`${this.apiUrl}/getEvent`);
  }

  // Méthode pour ajouter un événement
  addEvent(eventData: Event): Observable<Event> {
    return this.http.post<Event>(`${this.apiUrl}/addEvent`, eventData);
  }

  // Méthode pour mettre à jour un événement
  updateEvent(eventData: Event): Observable<Event> {
    return this.http.put<Event>(`${this.apiUrl}/updateEvent`, eventData);
  }

  // Méthode pour récupérer un événement par son ID
  getEventById(idEvent: number): Observable<Event> {
    return this.http.get<Event>(`${this.apiUrl}/getEventById/${idEvent}`);
  }

  // Méthode pour supprimer un événement par son ID
  // service EventService
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
