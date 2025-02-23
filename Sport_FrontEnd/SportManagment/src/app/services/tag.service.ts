import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TagService {
  private apiUrl = 'http://localhost:8088/api/TrainingGround';  // ✅ URL backend

  constructor(private http: HttpClient) {}

  // ✅ Récupérer tous les tags
  getAllTags(): Observable<any> {
    return this.http.get(`${this.apiUrl}/getTags`);
  }

  // ✅ Ajouter un tag
  createTag(tag: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/AddTag`, tag);
  }

  // ✅ Supprimer un tag d'un exercice
  removeTagFromExercise(exerciseId: number, tagId: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${exerciseId}/remove-tag/${tagId}`);
  }
}
