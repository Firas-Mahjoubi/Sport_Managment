import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

@Component({
  selector: 'app-admin-card',
  templateUrl: './admin-card.component.html',
  styleUrls: ['./admin-card.component.css']
})
export class AdminCardComponent implements OnInit {
  matchId!: number;
  cards: any[] = [];
  loading: boolean = false;
  errorMessage: string = '';
  successMessage: string = '';

  cardType: string = 'YELLOW'; // Default card type
  playerNumber: number | null = null;
  isHomeTeam: boolean = true;
  cardTime: number | null = null;

  selectedFile: File | null = null; // Store the selected CSV file

  private baseUrl = 'http://localhost:8088/api'; // Updated to match the backend API structure

  constructor(private route: ActivatedRoute, private http: HttpClient) {}

  ngOnInit(): void {
    this.matchId = Number(this.route.snapshot.paramMap.get('matchId'));
    this.getCards();
  }

  getCards(): void {
    this.loading = true;
    this.errorMessage = '';

    this.http.get(`${this.baseUrl}/getcardsformatch/${this.matchId}`).subscribe({
      next: (response: any) => {
        this.cards = response ?? [];
        console.log('Fetched cards:', this.cards);
        this.loading = false;
      },
      error: (err) => {
        console.error('Error fetching cards:', err);
        this.errorMessage = 'Failed to fetch cards. Please try again.';
        this.loading = false;
      }
    });
  }

  addCard(): void {
    if (!this.isFormValid()) {
      this.errorMessage = 'Please fill in all required fields correctly (Player: 1-99, Time: 1-130)';
      return;
    }

    this.loading = true;
    this.errorMessage = '';
    this.successMessage = '';

    const cardData = {
      cardType: this.cardType,
      numberOfPlayer: this.playerNumber,
      cardTime: this.cardTime
    };

    this.http.post(`${this.baseUrl}/addCard/${this.matchId}?isHomeTeam=${this.isHomeTeam}`, cardData)
      .subscribe({
        next: () => {
          this.successMessage = 'Card added successfully!';
          this.getCards();
          this.loading = false;
          this.playerNumber = null;
          this.cardTime = null;
          this.cardType = 'YELLOW'; // Reset to default
          this.isHomeTeam = true;   // Reset to default
          setTimeout(() => this.successMessage = '', 3000); // Clear success message after 3s
        },
        error: (err) => {
          console.error('Error adding card:', err);
          this.errorMessage = 'Failed to add card. Please try again.';
          this.loading = false;
        }
      });
  }

  deleteCard(cardId: number | undefined): void {
    if (!cardId) {
      console.error('Card ID is undefined. Cannot delete.');
      return;
    }

    this.http.delete(`${this.baseUrl}/deleteCard/${cardId}`)
      .pipe(
        catchError(error => {
          console.error('Error deleting card:', error);
          this.errorMessage = 'Failed to delete card. Please try again.';
          return throwError(() => error);
        })
      )
      .subscribe(() => {
        this.successMessage = 'Card deleted successfully!';
        this.getCards();
        setTimeout(() => this.successMessage = '', 3000); // Clear success message after 3s
      });
  }

  isFormValid(): boolean {
    return this.playerNumber !== null &&
      this.playerNumber >= 1 &&
      this.playerNumber <= 99 &&
      this.cardTime !== null &&
      this.cardTime >= 1 &&
      this.cardTime <= 130 &&
      !!this.cardType &&
      this.isHomeTeam !== null;
  }

  // New methods for CSV upload
  onFileChange(event: any): void {
    const file = event.target.files[0];
    if (file && file.type === 'text/csv') {
      this.selectedFile = file;
      this.errorMessage = ''; // Clear any previous error
    } else {
      this.errorMessage = 'Please select a valid CSV file.';
      this.selectedFile = null;
    }
  }

  uploadCsv(): void {
    if (!this.selectedFile) {
      this.errorMessage = 'Please select a CSV file to upload.';
      return;
    }

    this.loading = true;
    this.errorMessage = '';
    this.successMessage = '';

    const formData = new FormData();
    formData.append('file', this.selectedFile);

    this.http.post(`${this.baseUrl}/uploadCards/${this.matchId}`, formData)
      .subscribe({
        next: (response: any) => {
          this.successMessage = response || 'Cards uploaded successfully!';
          this.getCards(); // Refresh the card list
          this.loading = false;
          this.selectedFile = null; // Clear the file input
          setTimeout(() => this.successMessage = '', 3000); // Clear success message after 3s
        },
        error: (err) => {
          console.error('Error uploading CSV:', err);
          this.errorMessage = err.error || 'Failed to upload CSV. Please try again.';
          this.loading = false;
        }
      });
  }
}
