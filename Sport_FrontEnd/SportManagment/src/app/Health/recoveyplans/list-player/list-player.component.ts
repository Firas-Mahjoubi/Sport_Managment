import { Component, OnInit } from '@angular/core';
import { PlayerService } from '../../services/player.service';
import { Player } from '../../models/player';
import { Router } from '@angular/router';

@Component({
  selector: 'app-list-player',
  templateUrl: './list-player.component.html',
  styleUrls: ['./list-player.component.css']
})
export class ListPlayerComponent implements OnInit {

  players: Player[] = [];

  constructor(private playerService: PlayerService,
    private router: Router


  ) {}

  ngOnInit(): void {
    this.loadPlayers();
  }

  loadPlayers(): void {
    this.playerService.getPlayers().subscribe({
      next: (data) => {
        this.players = data;
      },
      error: (err) => {
        console.error('Erreur lors du chargement des joueurs :', err);
      }
    });
  }

  selectPlayer(player: Player): void {
    console.log('Joueur sélectionné:', player);
    // Ici tu peux stocker l'ID dans le localStorage, ou dans un service partagé
    localStorage.setItem('selectedPlayerId', player.id.toString());
    // Ensuite tu navigues vers le composant add-recoveryplan directement (sans passer playerId dans l'URL)
    window.location.href = '/add-recoveryplan';
  }

  viewRecoveryPlans(): void {
    this.router.navigate(['/list-recoveryplan/:playerId']);
  }
}
