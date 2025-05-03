import { Component, OnInit } from '@angular/core';
import { ClubService } from 'src/app/services/club.service';
import { Club } from 'src/app/services/club.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-public-clubs',
  templateUrl: './public-clubs.component.html',
  styleUrls: ['./public-clubs.component.css']
})
export class PublicClubsComponent implements OnInit {
  clubs: Club[] = [];
  searchKeyword: string = '';

  constructor(private clubService: ClubService, private router: Router) {}

  ngOnInit(): void {
    this.clubService.getAll().subscribe(data => {
      this.clubs = data;
    });
  }

  searchClubs(): void {
    if (this.searchKeyword.trim() === '') {
      // Si champ vide ➔ recharger tous les clubs
      this.clubService.getAll().subscribe(data => {
        this.clubs = data;
      });
    } else {
      // Sinon ➔ chercher avec mot clé
      this.clubService.searchClubs(this.searchKeyword).subscribe(data => {
        this.clubs = data;
      });
    }
  }
  

  viewPlayers(clubId: number): void {
    this.router.navigate(['/public-club-players', clubId]);
  }

  exportClubsCsv(): void {
    this.clubService.downloadClubsCsv().subscribe(blob => {
      const a = document.createElement('a');
      const objectUrl = URL.createObjectURL(blob);
      a.href = objectUrl;
      a.download = 'clubs_with_players.csv';
      a.click();
      URL.revokeObjectURL(objectUrl);
    });
  }
  

  exportClubPdf(clubId: number): void {
    this.clubService.downloadClubPdf(clubId).subscribe(blob => {
      const a = document.createElement('a');
      const objectUrl = URL.createObjectURL(blob);
      a.href = objectUrl;
      a.download = `club_${clubId}.pdf`;
      a.click();
      URL.revokeObjectURL(objectUrl);
    });
  }
  
}
