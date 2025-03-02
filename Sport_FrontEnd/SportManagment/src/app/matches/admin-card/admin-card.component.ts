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
  cardTime: number | null = null; // New field for card time

  private baseUrl = 'http://localhost:8088';

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
        console.log('Fetched cards:', this.cards); // ✅ Log fetched cards
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
    if (!this.playerNumber || this.cardTime === null || this.cardTime < 0) {
      this.errorMessage = 'Player number and card time are required!';
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

    // Send `isHomeTeam` as a query parameter
    this.http.post(`${this.baseUrl}/addCard/${this.matchId}?isHomeTeam=${this.isHomeTeam}`, cardData)
      .subscribe({
        next: () => {
          this.successMessage = 'Card added successfully!';
          this.getCards();
          this.loading = false;
          this.playerNumber = null;
          this.cardTime = null;
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
        this.getCards(); // Refresh the list after deletion
      });
  }


}
