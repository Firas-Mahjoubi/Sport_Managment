import { Component, OnInit } from '@angular/core';
import { PlayerService, Player } from 'src/app/services/player.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-player-list',
  templateUrl: './player-list.component.html',
  styleUrls: ['./player-list.component.css']
})
export class PlayerListComponent implements OnInit {
  players: Player[] = [];
  sortDirection: string = 'asc'; // ✅ Direction de tri (ascendant ou descendant)


  constructor(private playerService: PlayerService, private router: Router) {}

  ngOnInit(): void {
    this.getPlayers();
  }

  // ✅ Récupérer tous les joueurs
  getPlayers(): void {
    this.playerService.getAll().subscribe(data => {
      this.players = data.map(player => ({
        ...player,
        imageUrl: `http://localhost:8088/players/image/${player.id}`, // 👈 crée une vraie URL utilisable
        birthDate: player.birthDate || 'Non spécifiée',
        status: player.status || 'Non défini'
      }));
    
    });
  }

   // ✅ Fonction de tri des joueurs
   sortPlayers(field: string): void {
    this.playerService.getSortedPlayers(field, this.sortDirection).subscribe(data => {
      this.players = data.map(player => ({
        ...player,
        imageUrl: `http://localhost:8088/players/image/${player.id}`,
        birthDate: player.birthDate || 'Non spécifiée',
        status: player.status || 'Non défini'
      }));

      // ✅ Inverser la direction pour le prochain clic
      this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
    });
  }
  
  
  // ✅ Fonction de modification
  editPlayer(player: Player): void {
    console.log("🛠 Editing player:", player);
    if (player.id !== undefined) {
      this.router.navigate(['/edit-player', player.id]); // ✅ Redirection vers la page d'édition
    } else {
      console.error("❌ Player ID is undefined !");
    }
  }

  // ✅ Fonction de suppression
  deletePlayer(id?: number): void {
    if (id !== undefined && confirm("Do you really want to delete this player?")) {
      this.playerService.delete(id).subscribe(() => {
        console.log("✅ Player deleted successfully!");
        this.players = this.players.filter(p => p.id !== id); // ✅ Met à jour la liste
      });
    }
  }

  viewDetails(id: number): void {
    this.router.navigate(['/players', id]);  // Redirige vers /players/1, /players/2 etc.
  }
}
