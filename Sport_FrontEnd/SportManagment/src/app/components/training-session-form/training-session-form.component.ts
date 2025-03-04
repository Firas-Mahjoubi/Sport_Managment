import { Component, OnInit } from '@angular/core';
import { TrainingSessionService } from '../../services/training-session.service';
import { ExerciseService } from '../../services/exercise.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-training-session-form',
  templateUrl: './training-session-form.component.html',
  styleUrls: ['./training-session-form.component.css']
})
export class TrainingSessionFormComponent implements OnInit {
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
  players: any;

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
      (error) => { console.error('Error fetching exercises:', error); }
    );
  }

  // ✅ Save Training Session
  saveSession(): void {
    this.trainingSession.exercises = this.selectedExercises.map(id => ({ id })); // Format exercises

    console.log("🛠 Sending Data:", JSON.stringify(this.trainingSession)); // Debugging

    this.trainingSessionService.createSession(this.trainingSession).subscribe({
      next: () => {
        this.router.navigate(['/training-sessions']);
      },
      error: (error) => {
        console.error("❌ Error:", error);
        alert("Failed to add session. Check console for details.");
      }
    });
  }
}