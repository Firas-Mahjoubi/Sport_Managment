import { Component, OnInit } from '@angular/core';
import { TeamService, Team} from 'src/app/services/team.service';

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
      console.log("📌 Data received from API :", data); // ✅ Vérifie si `category` est présent
      this.teams = data;
    });
  }
  

  // ✅ Fonction pour supprimer une équipe
  deleteTeam(id: number): void {
    if (confirm("Do you really want to delete this team?")) {
      this.teamService.delete(id).subscribe(() => {
        this.teams = this.teams.filter(team => team.id !== id);
        alert("Team successfully deleted!");
      });
    }
  }
}
