import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ExerciseService {
  private apiUrl = 'http://localhost:8088/api/TrainingGround';  // ✅ URL mise à jour

  constructor(private http: HttpClient) {}

 // ✅ 1. Get All Exercises
 getAllExercises(): Observable<any> {
  return this.http.get(`${this.apiUrl}/getExercices`);
}

// ✅ 2. Get Exercise by ID (For Editing)
getExerciseById(exerciseId: number): Observable<any> {
  return this.http.get(`${this.apiUrl}/exercise/${exerciseId}`);
}

// ✅ 3. Create a New Exercise
createExercise(exercise: any): Observable<any> {
  return this.http.post(`${this.apiUrl}/AddExercice`, exercise);
}

// ✅ 4. Update an Existing Exercise
updateExercise(exerciseId: number, exercise: any): Observable<any> {
  return this.http.put(`${this.apiUrl}/updateExercice/${exerciseId}`, exercise);
}

// ✅ 5. Delete an Exercise
deleteExercise(id: number): Observable<any> {
  return this.http.delete(`${this.apiUrl}/deleteExercice/${id}`);
}

// ✅ 6. Add Tags to an Exercise
addTagsToExercise(exerciseId: number, tagIds: number[]): Observable<any> {
  return this.http.post(`${this.apiUrl}/${exerciseId}/add-tags`, tagIds);
}

// ✅ 7. Remove a Tag from an Exercise
removeTag(exerciseId: number, tagId: number): Observable<any> {
  return this.http.delete(`${this.apiUrl}/${exerciseId}/remove-tag/${tagId}`);
}

// ✅ 8. Add Media (Image/Video) to an Exercise
addMediaToExercise(media: any): Observable<any> {
  return this.http.post(`${this.apiUrl}/AddMediaToExercice/`, media);
}

// ✅ 9. Get Media for a Specific Exercise
getMediaByExercise(exerciseId: number): Observable<any> {
  return this.http.get(`${this.apiUrl}/exercise/${exerciseId}`);
}

// ✅ 10. Delete Media from an Exercise
deleteMedia(id: number): Observable<any> {
  return this.http.delete(`${this.apiUrl}/${id}`);
}

// ✅ 11. Update Visibility (Public/Private)
updateVisibility(exerciseId: number, visibility: string): Observable<any> {
  return this.http.put(`${this.apiUrl}/updateVisibility/${exerciseId}`, { visibility });
}

// ✅ 12. Get All Tags
getAllTags(): Observable<any> {
  return this.http.get(`${this.apiUrl}/getTags`);
}

// ✅ 14. Link Exercise to a Training Session
addExercisesToSession(sessionId: number, exerciseIds: number[]): Observable<any> {
  return this.http.post(`${this.apiUrl}/${sessionId}/add-exercises`, exerciseIds);
}

// ✅ 15. Get Exercises for a Specific Training Session
getExercisesForSession(sessionId: number): Observable<any> {
  return this.http.get(`${this.apiUrl}/session/${sessionId}/exercises`);
}

// ✅ 16. Remove an Exercise from a Training Session
removeExerciseFromSession(sessionId: number, exerciseId: number): Observable<any> {
  return this.http.delete(`${this.apiUrl}/session/${sessionId}/remove-exercise/${exerciseId}`);
}
  
}
