import { Component, OnInit } from '@angular/core';
import { PlayerService } from '../../services/player.service';
import { Player } from '../../models/player.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-player-list',
  templateUrl: './player-list.component.html',
  styleUrls: ['./player-list.component.css']
})
export class PlayerListComponent implements OnInit {
  players: Player[] = [];

  constructor(private playerService: PlayerService, private router: Router) {}

  ngOnInit(): void {
    this.getPlayers();
  }

  getPlayers(): void {
    this.playerService.getAll().subscribe(data => {
      this.players = data.map(player => ({
        ...player,
        birthDate: player.birthDate ? player.birthDate : 'Non spécifiée', // ✅ Ajoute une valeur par défaut
        status: player.status ? player.status : 'Non défini' // ✅ Gère le statut vide
      }));
    });
  }
  
  editPlayer(player: Player): void {
    console.log("🛠 Editing player:", player); // Debugging
    if (player.id !== undefined) {
      this.router.navigate(['/edit-player', player.id]);
    } else {
      console.error("❌ Player ID is undefined !");
    }
  }
  

  deletePlayer(id?: number): void {
    if (id !== undefined && confirm("Do you really want to delete this player? ?")) {
      this.playerService.delete(id).subscribe(() => {
        this.players = this.players.filter(p => p.id !== id);
      });
    }
  }
}
