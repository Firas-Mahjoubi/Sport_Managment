import { Component, OnInit } from '@angular/core';
import { ExerciseService } from '../../services/exercise.service';

@Component({
  selector: 'app-exercise-library',
  templateUrl: './exercise-library.component.html',
  styleUrls: ['./exercise-library.component.css']
})
export class ExerciseLibraryComponent implements OnInit {
  exercises: any[] = [];
  defaultImage = 'https://via.placeholder.com/300?text=No+Image+Available'; // ✅ Default Image
  searchQuery: string = '';
  sortBy: string = 'mostRecent';

  constructor(private exerciseService: ExerciseService) {}

  ngOnInit(): void {
    this.loadExercises();
  }

  // ✅ Fetch exercises
  loadExercises(): void {
    this.exerciseService.getAllExercises().subscribe(
      (data) => { this.exercises = data; },
      (error) => { console.error('Error loading exercises:', error); }
    );
  }

  // ✅ Filter exercises based on search
  get filteredExercises() {
    return this.exercises.filter(ex =>
      ex.name.toLowerCase().includes(this.searchQuery.toLowerCase())
    );
  }
}
