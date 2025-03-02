import { Component, OnInit } from '@angular/core';
import { TeamService } from '../../services/team.service';
import { Team } from '../../models/team.model';

@Component({
  selector: 'app-team-list',
  templateUrl: './team-list.component.html',
  styleUrls: ['./team-list.component.css']
})
export class TeamListComponent implements OnInit {
  teams: Team[] = [];

  constructor(private teamService: TeamService) {}

  ngOnInit(): void {
    this.getTeams();
  }

  // ✅ Récupérer toutes les équipes
  getTeams(): void {
    this.teamService.getAll().subscribe((data) => {
      this.teams = data;
    });
  }

  // ✅ Fonction pour supprimer une équipe
  deleteTeam(id: number): void {
    if (confirm("Voulez-vous vraiment supprimer cette équipe ?")) {
      this.teamService.delete(id).subscribe(() => {
        this.teams = this.teams.filter(team => team.id !== id);
        alert("Équipe supprimée avec succès !");
      });
    }
  }
}
