import { Component } from '@angular/core';
import { LeagueService } from '../../services/league.service';
import { League } from '../../models/league.model';

@Component({
  selector: 'app-league-form',
  templateUrl: './league-form.component.html',
  styleUrls: ['./league-form.component.css']
})
export class LeagueFormComponent {
  league: League = { name: '', country: ''};

  countries: string[] = [
    'France', 'Espagne', 'Italie', 'Allemagne', 'Angleterre', 'Portugal', 
    'Brésil', 'Argentine', 'États-Unis', 'Tunisie', 'Maroc', 'Algérie'
  ];

  constructor(private leagueService: LeagueService) {}

  addLeague(): void {
    if (!this.league.name) {
      alert("Please enter the league name!");
      return;
    }

    this.leagueService.create(this.league).subscribe(() => {
      alert("League added successfully!");
      this.resetForm();
    });
  }

  resetForm(): void {
    this.league = { name: '', country: '' };
  }
}
