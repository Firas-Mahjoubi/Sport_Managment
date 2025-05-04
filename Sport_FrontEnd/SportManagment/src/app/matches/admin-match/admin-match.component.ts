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
  matchesByLeague: { [key: string]: any[] } = {};
  loading: boolean = false;
  errorMessage: string = '';
  successMessage: string = '';
  selectedFile: File | null = null;
  uploading: boolean = false;
  private baseUrl = 'http://localhost:8088';

  constructor(private http: HttpClient, private router: Router) {}

  ngOnInit(): void {
    this.getMatches();
  }

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.selectedFile = input.files[0];
      if (this.selectedFile.type !== 'application/pdf') {
        this.errorMessage = 'Please select a valid PDF file.';
        this.selectedFile = null;
      } else {
        this.errorMessage = '';
      }
      input.value = ''; // Reset input to allow re-uploading the same file
    }
  }

  uploadPDF(): void {
    if (!this.selectedFile) {
      this.errorMessage = 'Please select a PDF file to upload.';
      return;
    }

    this.uploading = true;
    this.errorMessage = '';
    this.successMessage = '';

    const formData = new FormData();
    formData.append('file', this.selectedFile);

    this.http.post(`${this.baseUrl}/upload-pdf`, formData, { responseType: 'text' }).subscribe({
      next: (response) => {
        this.uploading = false;
        this.successMessage = response; // e.g., "File uploaded successfully: 1634567890123-file.pdf"
        this.selectedFile = null;
      },
      error: (err) => {
        this.uploading = false;
        this.errorMessage = err.error || 'Failed to upload PDF. Please try again.';
        this.selectedFile = null;
        console.error('Upload error:', err);
      }
    });
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
        this.matchesByLeague = { [this.leagueName]: response?.matches ?? [] };
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
        if (response) {
          this.matchesByLeague = response;
        } else {
          this.matchesByLeague = {};
        }
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

  navigateToAdminSubstitution(matchId: number): void {
    this.router.navigate(['/admin-substitutions', matchId]);
  }

  Object = Object;
}
