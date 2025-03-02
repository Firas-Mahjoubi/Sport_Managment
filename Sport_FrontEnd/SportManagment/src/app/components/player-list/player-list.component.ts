import { Component, OnInit } from '@angular/core';
import { PlayerService } from '../../services/player.service';
import { Player } from '../../models/player.model';

@Component({
  selector: 'app-player-list',
  templateUrl: './player-list.component.html',
  styleUrls: ['./player-list.component.css']
})
export class PlayerListComponent implements OnInit {
  players: Player[] = [];

  constructor(private playerService: PlayerService) {}

  ngOnInit(): void {
    this.getPlayers();
  }

  getPlayers(): void {
    this.playerService.getAll().subscribe(data => {
      this.players = data;
    });
  }

  deletePlayer(id: number): void {
    if (confirm("Voulez-vous vraiment supprimer ce joueur ?")) {
      this.playerService.delete(id).subscribe(() => {
        this.players = this.players.filter(p => p.id !== id);
      });
    }
  }
}
