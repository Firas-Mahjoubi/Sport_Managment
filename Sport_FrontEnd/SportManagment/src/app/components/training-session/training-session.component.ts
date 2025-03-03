import { Component, OnInit } from '@angular/core';
import { TrainingSessionService } from '../../services/training-session.service';

@Component({
  selector: 'app-training-session',
  templateUrl: './training-session.component.html',
  styleUrls: ['./training-session.component.css']
})
export class TrainingSessionComponent implements OnInit {
  trainingSessions: any[] = [];
  exercises: any[] = [];
  selectedSessionId: number | null = null;
  selectedExercises: number[] = [];

  constructor(private trainingSessionService: TrainingSessionService) {}

  ngOnInit(): void {
    this.loadTrainingSessions();
    this.loadExercises();
  }

  // ✅ Load all training sessions
  loadTrainingSessions(): void {
    this.trainingSessionService.getTrainingSessions().subscribe(
      (data) => { this.trainingSessions = data; },
      (error) => { console.error('Error loading sessions:', error); }
    );
  }

  // ✅ Load all exercises
  loadExercises(): void {
    this.trainingSessionService.getAllExercises().subscribe(
      (data) => { this.exercises = data; },
      (error) => { console.error('Error loading exercises:', error); }
    );
  }

  // ✅ Handle exercise selection
  toggleExerciseSelection(exerciseId: number): void {
    if (this.selectedExercises.includes(exerciseId)) {
      this.selectedExercises = this.selectedExercises.filter(id => id !== exerciseId);
    } else {
      this.selectedExercises.push(exerciseId);
    }
  }

  // ✅ Add selected exercises to the chosen training session
  addExercisesToSession(): void {
    if (!this.selectedSessionId) {
      alert('Please select a training session.');
      return;
    }

    this.trainingSessionService.addExercisesToSession(this.selectedSessionId, this.selectedExercises).subscribe(
      (response) => {
        alert('Exercises added successfully!');
        this.selectedExercises = []; // Reset selection
      },
      (error) => {
        console.error('Error adding exercises:', error);
        alert('Failed to add exercises.');
      }
    );
  }
}
