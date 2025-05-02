import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PlayerService, Player } from 'src/app/services/player.service';

@Component({
  selector: 'app-player-detail',
  templateUrl: './player-detail.component.html'
})
export class PlayerDetailComponent implements OnInit {
  player?: Player;

  constructor(private route: ActivatedRoute, private playerService: PlayerService) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.playerService.getById(id).subscribe(data => {
      console.log(data);
      this.player = {
        ...data,
        imageUrl: `http://localhost:8088/players/image/${id}`,
        teamName: data.team.categories || 'Not assigned',
        clubName: data.club.name|| 'Not assigned'
      };
    });
    
  }
  onImageError(event: Event) {
    const target = event.target as HTMLImageElement;
    target.src = 'assets/default-avatar.png';
  }
  
}
