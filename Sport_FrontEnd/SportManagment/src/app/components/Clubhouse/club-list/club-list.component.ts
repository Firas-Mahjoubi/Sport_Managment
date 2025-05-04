import { Component, OnInit } from '@angular/core';
import { ClubService, Club } from 'src/app/services/club.service';

import { Router } from '@angular/router';
@Component({
  selector: 'app-club-list',  // ✅ Vérifie que le sélecteur est bien écrit ici
  templateUrl: './club-list.component.html',
  styleUrls: ['./club-list.component.css']

})
export class ClubListComponent implements OnInit {

  clubs: Club[] = [];

  constructor(private clubService: ClubService, private router: Router) {}

  ngOnInit(): void {
    console.log("✅ ClubListComponent chargé !");
    this.getClubs();
  }

  getClubs(): void {
    this.clubService.getAll().subscribe(data => {
      this.clubs = data.map(club => ({
        ...club,
        // ✅ Génère l'URL dynamique de l'image du club depuis le backend
        imageUrl: `http://localhost:8088/clubs/image/${club.id}`,
        
        // ✅ Valeur par défaut si la date de fondation est manquante
        foundationYear: club.foundationYear || 'Not specified'
      }));
    });
  }
  
  

  editClub(club: Club): void {
    console.log("✏️ Editing club:", club);
    this.router.navigate(['/edit-club', club.id]);  // ✅ Navigation vers la page d'édition
  }
  
  
  deleteClub(id?: number): void {
    if (id !== undefined && confirm("Are you sure you want to delete this club?")) {
      this.clubService.delete(id).subscribe(() => {
        this.clubs = this.clubs.filter(c => c.id !== id);
      });
    }
  }

  viewClubDetails(id: number): void {
    this.router.navigate(['/club-details', id]); // 👉 tu rediriges vers la page détail
  }
  

  
}
