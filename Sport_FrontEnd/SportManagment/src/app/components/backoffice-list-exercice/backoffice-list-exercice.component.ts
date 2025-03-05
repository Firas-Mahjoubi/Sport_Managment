import { Component, OnInit } from '@angular/core';
import { ExerciseService } from '../../services/exercise.service';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

@Component({
  selector: 'app-backoffice-list-exercice',
  templateUrl: './backoffice-list-exercice.component.html',
  styleUrls: ['./backoffice-list-exercice.component.css']
})
export class BackofficeListExerciceComponent {

  exercises: any[] = [];
  exercise: any = {
    name: '',
    visibility: 'PUBLIC',
    description: '',
  };
  isEditing: boolean = false;
  isSubmitting: boolean = false;
  showSuccessPopup: boolean = false;
  exerciseId: number | null = null; // Store ID when editing

  constructor(private exerciseService: ExerciseService) {}

  ngOnInit(): void {
    this.loadExercises();
  }

  // ✅ Load all exercises
  loadExercises(): void {
    this.exerciseService.getAllExercises().subscribe(
      (data) => {
        this.exercises = data;
      },
      (error) => {
        console.error('Error loading exercises:', error);
      }
    );
  }

  // ✅ Save (Create or Update)
  saveExercise(): void {
    if (this.isSubmitting) return;  
    this.isSubmitting = true;

    if (this.isEditing) {
      // Update exercise
      this.exerciseService.updateExercise(this.exerciseId!, this.exercise).subscribe(() => {
        this.showPopup();
        this.loadExercises(); // Refresh list
        this.resetForm();
      });
    } else {
      // Create new exercise
      this.exerciseService.createExercise(this.exercise).subscribe(() => {
        this.showPopup();
        this.loadExercises(); // Refresh list
        this.resetForm();
      });
    }
  }

  // ✅ Edit an exercise (Prefill form)
  editExercise(ex: any): void {
    this.exercise = { ...ex };
    this.exerciseId = ex.id;
    this.isEditing = true;
  }

  // ✅ Delete an exercise
  deleteExercise(id: number): void {
    if (confirm('Are you sure you want to delete this exercise?')) {
      this.exerciseService.deleteExercise(id).subscribe(() => {
        this.loadExercises();
      });
    }
  }

  // ✅ Reset form after save/update
  resetForm(): void {
    this.exercise = { name: '', visibility: 'PUBLIC', description: '' };
    this.isEditing = false;
    this.isSubmitting = false;
  }

  // ✅ Show popup notification
  showPopup(): void {
    this.showSuccessPopup = true;
    setTimeout(() => {
      this.showSuccessPopup = false;
    }, 3000);
  }
}
