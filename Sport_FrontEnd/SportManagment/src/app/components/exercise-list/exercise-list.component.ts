import { Component, OnInit } from '@angular/core';
import { ExerciseService } from '../../services/exercise.service';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
@Component({
  selector: 'app-exercise-list',
  templateUrl: './exercise-list.component.html',
  styleUrls: ['./exercise-list.component.css']
})
export class ExerciseListComponent implements OnInit {
  exercises: any[] = [];
  defaultImage: string = 'https://via.placeholder.com/150'; // ✅ Default Image

  constructor(private exerciseService: ExerciseService,private sanitizer: DomSanitizer) {
    
  }
  getStars(level: number): SafeHtml {
    const maxStars = 5; // Maximum of 5 stars
    const fullStar = '<i class="fas fa-star text-warning"></i>';
    const emptyStar = '<i class="far fa-star text-warning"></i>';

    let stars = '';
    for (let i = 1; i <= maxStars; i++) {
      stars += i <= Math.round(level / 20) ? fullStar : emptyStar;
    }
    
    return this.sanitizer.bypassSecurityTrustHtml(stars);
  }
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
