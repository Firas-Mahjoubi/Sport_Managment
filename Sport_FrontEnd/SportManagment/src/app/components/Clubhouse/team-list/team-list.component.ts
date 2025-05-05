import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { TeamService, Team } from 'src/app/services/team.service';

@Component({
  selector: 'app-team-list',
  templateUrl: './team-list.component.html',
  styleUrls: ['./team-list.component.css']
})
export class TeamListComponent implements OnInit {
  teams: Team[] = [];
  unassignedUsers: any[] = []; // liste des utilisateurs sans team
  selectedUsers: { [teamId: number]: number } = {}; // user sélectionné par team

  constructor(
    private teamService: TeamService,
    private http: HttpClient
  ) {}

  ngOnInit(): void {
    this.getTeams();
    this.getUnassignedUsers();
  }

  // 🔁 Récupérer toutes les équipes
  getTeams(): void {
    this.teamService.getAll().subscribe((data) => {
      this.teams = data;
    });
  }

  // 🔁 Récupérer les utilisateurs non assignés à une équipe
  getUnassignedUsers(): void {
    this.http.get<any[]>("http://localhost:8088/api/users/unassigned")
      .subscribe(data => {
        this.unassignedUsers = data;
      });
  }

  // ✅ Assigner un utilisateur sélectionné à une team
  assignUserToTeam(teamId: number): void {
    const userId = this.selectedUsers[teamId];
    if (!userId) {
      alert("Veuillez sélectionner un utilisateur.");
      return;
    }
  
    this.http.put(`http://localhost:8088/api/users/${userId}/assign-team/${teamId}`, {}, { responseType: 'text' })
  .subscribe({
    next: (response) => {
      console.log("✅ Réponse reçue :", response);
      alert("Utilisateur assigné avec succès !");
      this.unassignedUsers = this.unassignedUsers.filter(u => u.id !== userId);
      delete this.selectedUsers[teamId];
    },
    error: (err) => {
      console.error("❌ Erreur de retour Angular :", err);
      alert("Échec de l’assignation. Veuillez réessayer.");
    }
  });
  }
    
  
  

  // 🗑 Supprimer une équipe
  deleteTeam(id: number): void {
    if (confirm("Do you really want to delete this team?")) {
      this.teamService.delete(id).subscribe(() => {
        this.teams = this.teams.filter(team => team.id !== id);
        alert("Team successfully deleted!");
      });
    }
  }
}
