import { Component, OnInit } from '@angular/core';
import { ClubService } from '../../services/club.service';
import { Club } from '../../models/club.model';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-club-form',
  templateUrl: './club-form.component.html',
  styleUrls: ['./club-form.component.css']
})
export class ClubFormComponent implements OnInit {
  club: Club = { name: '', location: '', stadiumName: '', foundationYear: '', clubLogo: '' };
  isEditMode = false;

  constructor(
    private clubService: ClubService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.isEditMode = true;
      this.clubService.getById(+id).subscribe({
        next: (data) => {
          this.club = data;
        },
        error: (err) => {
          console.error("❌ Erreur lors de la récupération du club:", err);
          alert("Erreur lors de la récupération du club !");
        }
      });
    }
  }

  logButtonClick(): void {
    console.log("✅ Button clicked!");
  }

  saveClub(): void {
    if (!this.club.name || !this.club.location) {
      alert("❌ Veuillez remplir tous les champs obligatoires !");
      return;
    }

    if (this.isEditMode) {
      this.clubService.update(this.club.id!, this.club).subscribe({
        next: () => {
          alert("✅ Club modifié avec succès !");
          this.router.navigate(['/clubs']);
        },
        error: (err) => {
          console.error("❌ Erreur lors de la modification du club:", err);
          alert("❌ Une erreur est survenue !");
        }
      });
    } else {
      this.clubService.create(this.club).subscribe({
        next: () => {
          alert("✅ Club ajouté avec succès !");
          this.resetForm();
          this.router.navigate(['/clubs']);
        },
        error: (err) => {
          console.error("❌ Erreur lors de l'ajout du club:", err);
          alert("❌ Une erreur est survenue !");
        }
      });
    }
  }

  resetForm(): void {
    this.club = { name: '', location: '', stadiumName: '', foundationYear: '', clubLogo: '' };
  }
}
