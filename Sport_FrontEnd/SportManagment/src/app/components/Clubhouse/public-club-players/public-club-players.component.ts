import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PlayerService, Player } from 'src/app/services/player.service';
import { trigger, transition, style, animate } from '@angular/animations';

@Component({
  selector: 'app-public-club-players',
  templateUrl: './public-club-players.component.html',
  styleUrls: ['./public-club-players.component.css'],
  animations: [
    trigger('fadeIn', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(20px)' }),
        animate('600ms ease-out', style({ opacity: 1, transform: 'translateY(0)' }))
      ])
    ])
  ]
})
export class PublicClubPlayersComponent implements OnInit {
  players: Player[] = [];
  loading: boolean = true;
  clubId: number;
  clubName: string = '';

  constructor(
    private route: ActivatedRoute, 
    private router: Router,
    private playerService: PlayerService
  ) {
    this.clubId = Number(this.route.snapshot.paramMap.get('id'));
  }

  ngOnInit(): void {
    if (!this.clubId) {
      this.router.navigate(['/clubs']);
      return;
    }
    
    this.loadPlayers();
  }

  loadPlayers(): void {
    this.loading = true;
    this.playerService.getAll().subscribe({
      next: (data) => {
        this.players = data
          .filter(p => p.club?.id === this.clubId)
          .sort((a, b) => (a.playerNumber || 0) - (b.playerNumber || 0));
        
        if (this.players.length > 0 && this.players[0].club) {
          this.clubName = this.players[0].club.name;
        }
        this.loading = false;
      },
      error: (err) => {
        console.error('Erreur lors du chargement des joueurs:', err);
        this.loading = false;
      }
    });
  }

  getPositionLabel(position: string): string {
    // Formatage du poste si nécessaire
    return position ? position.toUpperCase() : 'N/A';
  }
}