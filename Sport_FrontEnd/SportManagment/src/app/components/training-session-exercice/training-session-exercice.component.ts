import { Component, OnInit  } from '@angular/core';
import { TrainingSessionService } from '../../services/training-session.service';
@Component({
  selector: 'app-training-session-exercice',
  templateUrl: './training-session-exercice.component.html',
  styleUrls: ['./training-session-exercice.component.css']
})
export class TrainingSessionExerciceComponent implements OnInit{
  trainingSessions: any[] = [];  // Store sessions

  constructor(private trainingSessionService: TrainingSessionService) {}

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
}
