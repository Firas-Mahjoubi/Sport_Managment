import { Component, OnInit } from '@angular/core';
import { ClubService } from '../../services/club.service';
import { Club } from '../../models/club.model';

@Component({
  selector: 'app-club-list',  // ✅ Vérifie que le sélecteur est bien écrit ici
  templateUrl: './club-list.component.html'
})
export class ClubListComponent implements OnInit {
  clubs: Club[] = [];

  constructor(private clubService: ClubService) {}

  ngOnInit(): void {
    console.log("✅ ClubListComponent chargé !");
    this.getClubs();
  }

  getClubs(): void {
    this.clubService.getAll().subscribe(data => {
      this.clubs = data;
    });
  }

  deleteClub(id: number): void {
    this.clubService.delete(id).subscribe(() => {
      this.clubs = this.clubs.filter(club => club.id !== id);
    });
  }
}
