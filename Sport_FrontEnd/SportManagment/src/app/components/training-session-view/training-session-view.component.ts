import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TrainingSessionService } from '../../services/training-session.service';

@Component({
  selector: 'app-training-session-view',
  templateUrl: './training-session-view.component.html',
  styleUrls: ['./training-session-view.component.css']
})
export class TrainingSessionViewComponent implements OnInit {
  
  trainingSession: any = { exercices: [] }; // ✅ Ensure exercices is an array
  defaultImage = 'https://via.placeholder.com/150';
  cumulativeTimes: number[] = []; // Store cumulative times

  constructor(
    private route: ActivatedRoute,
    private trainingSessionService: TrainingSessionService
  ) {}

  ngOnInit(): void {
    const sessionId = this.route.snapshot.paramMap.get('id');
    if (sessionId) {
      this.loadTrainingSession(parseInt(sessionId, 10));
    }
  }

  loadTrainingSession(id: number): void {
    this.trainingSessionService.getTrainingSessionById(id).subscribe(
      (data) => {
        console.log("Received Training Session:", data); // ✅ Debugging Log
        this.trainingSession = {
          ...data,
          exercices: data.exercices || data.exercises || [] // ✅ Ensure `exercices` is an array
        };
        this.calculateCumulativeTimes();
      },
      (error) => {
        console.error('Error loading session:', error);
      }
    );
  }

  // Function to calculate cumulative times
  calculateCumulativeTimes(): void {
    this.cumulativeTimes = [];
    let totalTime = 0;

    for (let exercise of this.trainingSession.exercices) {
      totalTime += exercise.durationMinutes;
      this.cumulativeTimes.push(totalTime);
    }
  }

  // Function to get cumulative time at a given index
  getCumulativeTime(index: number): number {
    return this.cumulativeTimes[index] || 0;
  }

  // Color for intensity badge
  getIntensityColor(intensity: string): string {
    switch (intensity?.toLowerCase()) {
      case 'low': return 'success';
      case 'medium': return 'warning';
      case 'high': return 'danger';
      default: return 'secondary';
    }
  }
}
