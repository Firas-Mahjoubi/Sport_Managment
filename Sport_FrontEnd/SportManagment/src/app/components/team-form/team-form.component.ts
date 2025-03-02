import { Component, OnInit } from '@angular/core';
import { TeamService } from '../../services/team.service';
import { Team } from '../../models/team.model';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-team-form',
  templateUrl: './team-form.component.html',
  styleUrls: ['./team-form.component.css']
})
export class TeamFormComponent implements OnInit {
  team: Team = { name: '', stadium: '', logoUrl: '', category: 'U18', clubId: 1 };
  categories: string[] = ['U18', 'Senior', 'Féminin', 'U21', 'Élite'];
  isEditMode = false;

  constructor(
    private teamService: TeamService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    // ✅ Vérifie si on est en mode modification
    const teamId = this.route.snapshot.paramMap.get('id');
    if (teamId) {
      this.isEditMode = true;
      this.getTeamById(Number(teamId));
    }
  }

  // ✅ Récupérer une équipe par ID
  getTeamById(id: number): void {
    this.teamService.getById(id).subscribe((data) => {
      this.team = data;
    });
  }

  // ✅ Ajouter ou Modifier une équipe
  saveTeam(): void {
    if (!this.team.name || !this.team.stadium) {
      alert("Veuillez remplir tous les champs !");
      return;
    }

    if (this.isEditMode) {
      // ✅ Mise à jour
      this.teamService.update(this.team.id!, this.team).subscribe(() => {
        alert("Équipe modifiée avec succès !");
        this.router.navigate(['/teams']);
      });
    } else {
      // ✅ Ajout
      this.teamService.create(this.team).subscribe(() => {
        alert("Équipe ajoutée avec succès !");
        this.router.navigate(['/teams']);
      });
    }
  }
}
