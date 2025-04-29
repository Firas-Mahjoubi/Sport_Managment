import { Component, OnInit } from '@angular/core';
import { TeamService, Team } from 'src/app/services/team.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-team-form',
  templateUrl: './team-form.component.html',
  styleUrls: ['./team-form.component.css']
})
export class TeamFormComponent implements OnInit {
  team: Team = { name: '', categories: 'SENIOR', clubId: 1 };
  // ✅ Valeur par défaut pour `category`
  categories: string[] = ['SENIOR', 'JUNIOR'];
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

  saveTeam(): void {
    if (!this.team.name || !this.team.categories) {
      alert("Please fill in all fields !");
      return;
    }
    console.log("📌 Données envoyées :", this.team);
  
    if (this.isEditMode) {
      this.teamService.update(this.team.id!, this.team).subscribe(() => {
        alert("Team successfully modified!");
        this.router.navigate(['/teams']);
      });
    } else {
      this.teamService.create(this.team).subscribe(() => {
        alert("Team added successfully !");
        this.router.navigate(['/teams']);
      });
    }
  }
  
  
}
