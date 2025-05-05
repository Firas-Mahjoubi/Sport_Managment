import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PlayerService } from 'src/app/services/player.service';

@Component({
  selector: 'app-players-by-club',
  templateUrl: './players-by-club.component.html',
  styleUrls: ['./players-by-club.component.css']
})
export class PlayersByClubComponent implements OnInit {
  players: any[] = [];

  constructor(private route: ActivatedRoute, private playerService: PlayerService) {}

  ngOnInit(): void {
    const clubId = Number(this.route.snapshot.paramMap.get('id'));
    this.playerService.getAll().subscribe(data => {
      this.players = data.filter(p => p.club?.id === clubId);
    });
  }
  
}
