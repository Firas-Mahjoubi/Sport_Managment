import { Component, OnInit, ViewChild } from '@angular/core';
import { TrainingSessionService } from '../../services/training-session.service';
import { ExerciseService } from '../../services/exercise.service';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';  // ✅ Import NgForm for validation

@Component({
  selector: 'app-training-session-form',
  templateUrl: './training-session-form.component.html',
  styleUrls: ['./training-session-form.component.css']
})
export class TrainingSessionFormComponent implements OnInit {
  @ViewChild('trainingForm') trainingForm!: NgForm; // ✅ Capture form reference

  trainingSession: any = {
    name: '',
    intensity: 'Medium',
    category: 'Tactical',
    date: '',
    startTime: '',
    endTime: '',
    location: '',
    attendingPlayers: 0,
    questionablePlayers: 0,
    absentPlayers: 0,
    beforeSessionNotes: '',
    afterSessionNotes: '',
    exercises: []
  };

  exercises: any[] = []; // List of available exercises
  selectedExercises: number[] = []; // Selected exercise IDs
  isSubmitting: boolean = false; // ✅ Prevent duplicate submissions

  constructor(
    private trainingSessionService: TrainingSessionService,
    private exerciseService: ExerciseService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadExercises();
  }

  // ✅ Load exercises from backend
  loadExercises(): void {
    this.exerciseService.getAllExercises().subscribe(
      (data) => { this.exercises = data; },
      (error) => { console.error('❌ Error fetching exercises:', error); }
    );
  }

  // ✅ Validate if End Time is after Start Time
  isEndTimeInvalid(): boolean {
    return this.trainingSession.endTime && this.trainingSession.startTime &&
           this.trainingSession.endTime <= this.trainingSession.startTime;
  }

  // ✅ Validate Players Count
  isPlayersCountValid(): boolean {
    return this.trainingSession.attendingPlayers >= 0 &&
           this.trainingSession.questionablePlayers >= 0 &&
           this.trainingSession.absentPlayers >= 0;
  }

  // ✅ Save Training Session with Validation
  saveSession(): void {
    if (this.isSubmitting) return; // Prevent multiple submissions
    if (this.trainingForm.invalid || this.isEndTimeInvalid() || !this.isPlayersCountValid()) {
      this.trainingForm.form.markAllAsTouched(); // ✅ Show all validation messages
      return;
    }

    this.isSubmitting = true;
    this.trainingSession.exercises = this.selectedExercises.map(id => ({ id }));

    console.log("🛠 Sending Data:", JSON.stringify(this.trainingSession)); // Debugging

    this.trainingSessionService.createSession(this.trainingSession).subscribe({
      next: () => {
        this.isSubmitting = false;
        this.router.navigate(['/training-sessions']);
      },
      error: (error) => {
        this.isSubmitting = false;
        console.error("❌ Error:", error);
        alert("Failed to add session. Check console for details.");
      }
    });
  }
}
