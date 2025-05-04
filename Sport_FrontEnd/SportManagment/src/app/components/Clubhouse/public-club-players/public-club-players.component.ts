import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PlayerService, Player } from 'src/app/services/player.service';

@Component({
  selector: 'app-public-club-players',
  templateUrl: './public-club-players.component.html',
})
export class PublicClubPlayersComponent implements OnInit {
  players: Player[] = [];

  constructor(private route: ActivatedRoute, private playerService: PlayerService) {}

  ngOnInit(): void {
    const clubId = Number(this.route.snapshot.paramMap.get('id'));
    this.playerService.getAll().subscribe(data => {
      this.players = data.filter(p => p.club?.id === clubId);
    });
  }
}
