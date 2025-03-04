import { Component, OnInit  } from '@angular/core';
import { TrainingSessionService } from '../../services/training-session.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-training-session-exercice',
  templateUrl: './training-session-exercice.component.html',
  styleUrls: ['./training-session-exercice.component.css']
})
export class TrainingSessionExerciceComponent implements OnInit{
  trainingSessions: any[] = [];  // Store sessions
  defaultImage: string = 'https://img.freepik.com/photos-premium/spheres-football-3d-raffinees-balles-football-blanches-noires-surface-grise-elegante_1031658-231.jpg?semt=ais_hybrid'; 

  constructor(private trainingSessionService: TrainingSessionService,private router : Router) {}

  ngOnInit(): void {
    this.loadTrainingSessions();
  }

  // ✅ Load all training sessions
  loadTrainingSessions(): void {
    this.trainingSessionService.getTrainingSessions().subscribe(
      (data) => { this.trainingSessions = data; },
      (error) => { console.error('Error loading sessions:', error); }
    );
  }

  // ✅ Navigate to session details
  navigateToSession(sessionId: number): void {
    if (!sessionId) return;
    
    console.log("📋 Navigating to session:", sessionId);
    this.router.navigate(['/training-session', sessionId]); // ✅ Update route accordingly
  }
  
  // ✅ Delete Training Session
  deleteSession(sessionId: number): void {
    if (!confirm("❌ Are you sure you want to delete this session?")) {
      return;
    }

    this.trainingSessionService.deleteSession(sessionId).subscribe({
      next: () => {
        alert("✅ Training session deleted successfully!");
        this.trainingSessions = this.trainingSessions.filter(session => session.id !== sessionId);
      },
      error: (error) => {
        console.error("❌ Error deleting session:", error);
        alert("❌ Failed to delete session.");
      }
    });
  }
}