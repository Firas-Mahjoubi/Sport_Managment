// AdminMatchComponent (admin-match.component.ts)
import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-match',
  templateUrl: './admin-match.component.html',
  styleUrls: ['./admin-match.component.css']
})
export class AdminMatchComponent implements OnInit {
  leagueName: string = '';
  gameWeek: number = 1;
  matches: any[] = [];
  loading: boolean = false;
  errorMessage: string = '';
  successMessage: string = '';
  private baseUrl = 'http://localhost:8088';

  constructor(private http: HttpClient, private router: Router) {}

  ngOnInit(): void {
    this.getMatches();
  }

  generateMatches(): void {
    if (!this.leagueName) {
      this.errorMessage = 'League name is required!';
      return;
    }

    this.loading = true;
    this.errorMessage = '';
    this.successMessage = '';

    this.http.get(`${this.baseUrl}/generate/${this.leagueName}`).subscribe({
      next: () => {
        this.successMessage = 'League matches generated successfully!';
        this.getMatchesAfterGeneration();
      },
      error: (err) => {
        console.error('Error generating matches:', err);
        this.errorMessage = 'Failed to generate matches. Please try again.';
        this.loading = false;
      }
    });
  }

  getMatchesAfterGeneration(): void {
    this.http.get(`${this.baseUrl}/get-matches-by-league?leagueName=${this.leagueName}`).subscribe({
      next: (response: any) => {
        this.matches = response?.matches ?? [];
        this.loading = false;
      },
      error: (err) => {
        console.error('Error fetching generated matches:', err);
        this.errorMessage = 'Failed to fetch generated matches. Please check your connection and try again.';
        this.loading = false;
      }
    });
  }

  getMatches(): void {
    this.loading = true;
    this.errorMessage = '';

    this.http.get(`${this.baseUrl}/get-matches-by-game-week?gameWeek=${this.gameWeek}`).subscribe({
      next: (response: any) => {
        this.matches = response?.Liga ?? [];
        this.loading = false;
      },
      error: (err) => {
        console.error('Error fetching matches:', err);
        this.errorMessage = 'Failed to fetch matches. Please check your connection and try again.';
        this.loading = false;
      }
    });
  }

  navigateToAdminGoal(matchId: number): void {
    this.router.navigate(['/admin-goals', matchId]);
  }
  navigateToAdminCard(matchId: number): void {
    this.router.navigate(['/admin-cards', matchId]);
  }

}
