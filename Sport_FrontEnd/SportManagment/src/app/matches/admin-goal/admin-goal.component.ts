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
  matchId!: number;
  goalForm: FormGroup;
  successMessage: string | null = null;
  errorMessage: string | null = null;
  private baseUrl = 'http://localhost:8088';

  constructor(
    private http: HttpClient,
    private route: ActivatedRoute,
    private fb: FormBuilder
  ) {
    this.goalForm = this.fb.group({
      scorerNumber: [null, [Validators.required, Validators.min(1), Validators.max(99)]],
      assisterNumber: [null, [Validators.min(1), Validators.max(99)]],
      timing: [null, [Validators.required, Validators.min(1), Validators.max(130)]],
      isHomeGoal: [true, Validators.required]
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
        this.errorMessage = 'Error fetching goals';
        return throwError(() => error);
      }))
      .subscribe(data => {
        this.goals = data;
        this.errorMessage = null;
      });
  }

  addGoal(): void {
    if (this.goalForm.invalid) {
      this.errorMessage = 'Please fill in all required fields correctly.';
      return;
    }

    const goalData = this.goalForm.value;
    const url = `${this.baseUrl}/addGoal/${this.matchId}?isHomeGoal=${goalData.isHomeGoal}`;

    this.http.post(url, goalData)
      .pipe(catchError(error => {
        console.error('Error adding goal:', error);
        this.errorMessage = 'Error adding goal';
        return throwError(() => error);
      }))
      .subscribe(() => {
        this.successMessage = 'Goal added successfully';
        this.getGoals();
        this.goalForm.reset({ isHomeGoal: true });
        setTimeout(() => this.successMessage = null, 3000);
      });
  }

  deleteGoal(goalId: number | undefined): void {
    if (!goalId) {
      console.error('Goal ID is undefined. Cannot delete.');
      this.errorMessage = 'Cannot delete goal: Invalid ID';
      return;
    }

    this.http.delete(`${this.baseUrl}/deleteGoal/${goalId}`)
      .pipe(catchError(error => {
        console.error('Error deleting goal:', error);
        this.errorMessage = 'Error deleting goal';
        return throwError(() => error);
      }))
      .subscribe(() => {
        this.successMessage = 'Goal deleted successfully';
        this.getGoals();
        setTimeout(() => this.successMessage = null, 3000);
      });
  }
}
