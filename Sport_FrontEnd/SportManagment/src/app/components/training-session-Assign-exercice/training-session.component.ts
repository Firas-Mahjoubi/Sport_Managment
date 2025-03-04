import { Component, OnInit } from '@angular/core';
import { TrainingSessionService } from '../../services/training-session.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-training-session',
  templateUrl: './training-session.component.html',
  styleUrls: ['./training-session.component.css']
})
export class TrainingSessionComponent implements OnInit {
  sessionId: number | null = null;
  trainingSession: any;
  exercises: any[] = [];
  selectedExercises: number[] = [];

  constructor(
    private route: ActivatedRoute,
    private trainingSessionService: TrainingSessionService
  ) {}

  ngOnInit(): void {
    // ✅ Ensure sessionId is always a number (Fallback to 0 if null)
    this.sessionId = Number(this.route.snapshot.paramMap.get('id')) || 0;
  
    if (this.sessionId > 0) { // Prevent calling API with an invalid ID
      this.loadTrainingSession();
      this.loadExercises();
    } else {
      console.error("❌ Invalid session ID:", this.sessionId);
    }
  }
  

  // ✅ Load training session details
  loadTrainingSession(): void {
    this.trainingSessionService.getTrainingSessionById(this.sessionId!).subscribe(session => {
      this.trainingSession = session;
    });
  }

  // ✅ Load available exercises
  loadExercises(): void {
    this.trainingSessionService.getAllExercises().subscribe(exercises => {
      this.exercises = exercises;
    });
  }

  // ✅ Toggle Exercise Selection
  toggleExerciseSelection(exerciseId: number): void {
    const index = this.selectedExercises.indexOf(exerciseId);
    if (index > -1) {
      this.selectedExercises.splice(index, 1);
    } else {
      this.selectedExercises.push(exerciseId);
    }
  }

  // ✅ Assign Selected Exercises to Session
  addExercisesToSession(): void {
    if (!this.sessionId) {
      alert("❌ Session ID is missing!");
      return;
    }

    if (this.selectedExercises.length === 0) {
      alert("❌ Please select at least one exercise.");
      return;
    }

    console.log("📤 Sending Request:", {
      sessionId: this.sessionId,
      exercises: this.selectedExercises
    });

    this.trainingSessionService.addExercisesToSession(this.sessionId, this.selectedExercises).subscribe({
      next: () => {
        alert("✅ Exercises assigned successfully!");
      },
      error: (error) => {
        console.error("❌ Error:", error);
        alert("❌ Failed to assign exercises.");
      }
    });
  }
}

