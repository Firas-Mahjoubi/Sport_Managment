import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

@Component({
  selector: 'app-admin-goal',
  templateUrl: './admin-goal.component.html',
  styleUrls: ['./admin-goal.component.css']
})
export class AdminGoalComponent implements OnInit {
  goals: any[] = [];
  matchId!: number; // Dynamically set from route
  goalForm: FormGroup;
  isHomeGoal: boolean = true; // Tracks whether it's a home or away goal
  private baseUrl = 'http://localhost:8088';

  constructor(
    private http: HttpClient,
    private route: ActivatedRoute,
    private fb: FormBuilder
  ) {
    this.goalForm = this.fb.group({
      scorerNumber: [null, Validators.required],
      assisterNumber: [null],
      timing: [null, Validators.required],
      isHomeGoal: [true] // Default: Home goal
    });
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const id = params.get('matchId');
      if (id) {
        this.matchId = +id;
        this.getGoals();
      }
    });
  }

  getGoals(): void {
    this.http.get<any[]>(`${this.baseUrl}/goalsformatch/${this.matchId}`)
      .pipe(catchError(error => {
        console.error('Error fetching goals:', error);
        return throwError(() => error);
      }))
      .subscribe(data => {
        this.goals = data;
      });
  }

  addGoal(): void {
    if (this.goalForm.invalid) {
      alert('Please fill in all required fields.');
      return;
    }

    const goalData = this.goalForm.value;
    const url = `${this.baseUrl}/addGoal/${this.matchId}?isHomeGoal=${goalData.isHomeGoal}`;

    this.http.post(url, goalData)
      .pipe(catchError(error => {
        console.error('Error adding goal:', error);
        return throwError(() => error);
      }))
      .subscribe(() => {
        this.getGoals();
        this.goalForm.reset({ isHomeGoal: true }); // Reset but keep default home goal selection
      });
  }

  deleteGoal(goalId: number | undefined): void {
    if (!goalId) {
      console.error('Goal ID is undefined. Cannot delete.');
      return;
    }

    this.http.delete(`${this.baseUrl}/deleteGoal/${goalId}`)
      .pipe(catchError(error => {
        console.error('Error deleting goal:', error);
        return throwError(() => error);
      }))
      .subscribe(() => {
        this.getGoals();
      });
  }

}
