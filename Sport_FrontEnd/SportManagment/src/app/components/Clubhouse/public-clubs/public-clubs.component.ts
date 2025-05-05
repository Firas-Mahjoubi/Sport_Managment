import { Component, OnInit } from '@angular/core';
import { ClubService, Club } from 'src/app/services/club.service';
import { Router } from '@angular/router';
import { finalize } from 'rxjs/operators';

@Component({
  selector: 'app-public-clubs',
  templateUrl: './public-clubs.component.html',
  styleUrls: ['./public-clubs.component.css']
})
export class PublicClubsComponent implements OnInit {
  clubs: Club[] = [];
  searchKeyword: string = '';
  userRole: string | null = null;
  userId: string | null = null;
  isLoading: boolean = false;

  constructor(private clubService: ClubService, private router: Router) {}

  ngOnInit(): void {
    this.loadUserInfo();
    this.loadClubs();
  }

  private loadUserInfo(): void {
    this.userRole = localStorage.getItem('userRole');
    this.userId = localStorage.getItem('userId');
  }

  private loadClubs(): void {
    this.isLoading = true;

    if (this.userRole === 'COACH' && this.userId) {
      // Coach : voir uniquement son club
      this.clubService.getClubsByCoach(+this.userId)
        .pipe(finalize(() => this.isLoading = false))
        .subscribe({
          next: (data) => {
            this.clubs = this.injectImageUrls(data);
          },
          error: (err) => {
            console.error('Error loading coach clubs:', err);
          }
        });
    } else {
      // Admin ou autre rôle : voir tous les clubs
      this.clubService.getAll()
        .pipe(finalize(() => this.isLoading = false))
        .subscribe({
          next: (data) => {
            this.clubs = this.injectImageUrls(data);
          }, 
          error: (err) => {
            console.error('Error loading all clubs:', err);
          }
        });
    }
  }

  // Injecte les URLs des images pour chaque club
  private injectImageUrls(clubs: Club[]): Club[] {
    return clubs.map(club => ({
      ...club,
      imageUrl: `http://localhost:8088/clubs/image/${club.id}`
    }));
  }

  searchClubs(): void {
    this.isLoading = true;
    
    if (this.searchKeyword.trim() === '') {
      this.loadClubs(); // Recharge la logique selon le rôle
    } else {
      this.clubService.searchClubs(this.searchKeyword)
        .pipe(finalize(() => this.isLoading = false))
        .subscribe({
          next: (data) => {
            this.clubs = this.injectImageUrls(data);
          },
          error: (err) => {
            console.error('Error searching clubs:', err);
          }
        });
    }
  }

  viewPlayers(clubId: number): void {
    this.router.navigate(['/public-club-players', clubId]);
  }

  exportClubsCsv(): void {
    this.clubService.downloadClubsCsv().subscribe({
      next: (blob) => {
        this.downloadFile(blob, 'clubs_with_players.csv');
      },
      error: (err) => {
        console.error('Error exporting clubs CSV:', err);
      }
    });
  }

  exportClubPdf(clubId: number): void {
    this.clubService.downloadClubPdf(clubId).subscribe({
      next: (blob) => {
        this.downloadFile(blob, `club_${clubId}.pdf`);
      },
      error: (err) => {
        console.error('Error exporting club PDF:', err);
      }
    });
  }

  private downloadFile(blob: Blob, fileName: string): void {
    const a = document.createElement('a');
    const objectUrl = URL.createObjectURL(blob);
    a.href = objectUrl;
    a.download = fileName;
    a.click();
    URL.revokeObjectURL(objectUrl);
  }
}