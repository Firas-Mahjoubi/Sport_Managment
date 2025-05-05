import { Component, OnInit, AfterViewInit } from '@angular/core';
import { ExerciseService } from '../services/exercise.service';

import {
  Chart,
  BarController,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend
} from 'chart.js';

@Component({
  selector: 'app-exercice-dashboard',
  templateUrl: './exercice-dashboard.component.html',
  styleUrls: ['./exercice-dashboard.component.css']
})
export class ExerciceDashboardComponent implements OnInit {
  stats: any;

  constructor(private exerciseService: ExerciseService) {
    Chart.register(BarController, BarElement, CategoryScale, LinearScale, Tooltip, Legend);
  }

  ngOnInit(): void {
    this.exerciseService.getStats().subscribe(data => {
      this.stats = data;
      this.initChart();
    });
  }

  initChart(): void {
    const canvas = document.getElementById('statsChart') as HTMLCanvasElement;
    if (!canvas) return;

    new Chart(canvas, {
      type: 'bar',
      data: {
        labels: ['Total Exercises', 'Total Sessions'],
        datasets: [{
          label: 'Dashboard Stats',
          data: [
            this.stats.totalExercises,
            this.stats.totalSessions
          ],
          backgroundColor: [
            'rgba(75, 192, 192, 0.5)',
            'rgba(153, 102, 255, 0.5)'
          ],
          borderColor: [
            'rgba(75, 192, 192, 1)',
            'rgba(153, 102, 255, 1)'
          ],
          borderWidth: 1
        }]
      },
      options: {
        responsive: true,
        scales: {
          y: {
            beginAtZero: true,
            type: 'linear' // ✅ Now properly registered
          }
        }
      }
    });
  }
}
