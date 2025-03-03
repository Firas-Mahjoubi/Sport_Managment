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

  constructor(private trainingSessionService: TrainingSessionService ,private router:Router) {}

  ngOnInit(): void {
    this.loadTrainingSessions();
  }

  // ✅ Fetch Training Sessions
  loadTrainingSessions(): void {
    this.trainingSessionService.getAllSessions().subscribe(
      (data) => {
        this.trainingSessions = data;
      },
      (error) => {
        console.error('Error fetching sessions:', error);
      }
    );
  }
  logSessionId(id: number) {
    console.log("Navigating to session with ID:", id);
}
navigateToSession(sessionId: number) {
  if (sessionId) {
      this.router.navigate(['/training-session', sessionId]);
  } else {
      console.error("Session ID is undefined!");
  }
}
}