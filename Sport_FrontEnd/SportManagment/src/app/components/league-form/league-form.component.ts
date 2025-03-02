import { Component } from '@angular/core';
import { LeagueService } from '../../services/league.service';
import { League } from '../../models/league.model';

@Component({
  selector: 'app-league-form',
  templateUrl: './league-form.component.html',
  styleUrls: ['./league-form.component.css']
})
export class LeagueFormComponent {
  league: League = { name: '' };

  constructor(private leagueService: LeagueService) {}

  addLeague(): void {
    if (!this.league.name) {
      alert("Veuillez saisir le nom de la ligue !");
      return;
    }

    this.leagueService.create(this.league).subscribe(() => {
      alert("Ligue ajoutée avec succès !");
      this.resetForm();
    });
  }

  resetForm(): void {
    this.league = { name: '' };
  }
}
