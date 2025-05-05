import { Component, OnInit } from '@angular/core';
import { TeamService, Team } from 'src/app/services/team.service';
import { ClubService } from 'src/app/services/club.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-team-form',
  templateUrl: './team-form.component.html',
  styleUrls: ['./team-form.component.css']
})
export class TeamFormComponent implements OnInit {
  team: Team = { name: '', categories: 'SENIOR', clubId: '' }; // clubId string vide = problème
  categories: string[] = ['SENIOR', 'JUNIOR'];
  isEditMode = false;
  clubs: any[] = []; // Liste des clubs récupérés depuis l’API

  constructor(
    private teamService: TeamService,
    private clubService: ClubService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    // Récupérer la liste des clubs
    this.clubService.getAll().subscribe(data => {
      this.clubs = data;
    });

    // Vérifie si en mode édition
    const teamId = this.route.snapshot.paramMap.get('id');
    if (teamId) {
      this.isEditMode = true;
      this.getTeamById(Number(teamId));
    }
  }

  getTeamById(id: number): void {
    this.teamService.getById(id).subscribe((data) => {
      this.team = data;
    });
  }

  saveTeam(): void {
    if (!this.team.name || !this.team.categories || !this.team.clubId) {
      alert("Please fill in all fields and select a club!");
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
        alert("Team added successfully!");
        this.router.navigate(['/teams']);
      });
    }
  }
}
