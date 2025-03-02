import { Component, OnInit } from '@angular/core';
import { ExerciseService } from '../../services/exercise.service';

@Component({
  selector: 'app-exercise-list',
  templateUrl: './exercise-list.component.html',
  styleUrls: ['./exercise-list.component.css']
})
export class ExerciseListComponent implements OnInit {
  exercises: any[] = [];
  defaultImage: string = 'https://via.placeholder.com/150'; // ✅ Default Image

  constructor(private exerciseService: ExerciseService) {}

  ngOnInit(): void {
    this.loadExercises();
  }

  // ✅ Fetch Exercises
  loadExercises(): void {
    this.exerciseService.getAllExercises().subscribe(
      (data) => { this.exercises = data; },
      (error) => { console.error('Error loading exercises:', error); }
    );
  }

  deleteExercise(id: number): void {
    if (confirm('Are you sure you want to delete this exercise?')) {
      this.exerciseService.deleteExercise(id).subscribe(
        () => {
          alert('Exercise deleted successfully!');
          this.loadExercises(); // Reload list after deletion
        },
        (error) => {
          console.error('Error deleting exercise:', error);
          alert('Failed to delete exercise.');
        }
      );
    }
  }
}
