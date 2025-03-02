import { Component } from '@angular/core';
import { LeagueService } from '../../services/league.service';
import { League } from '../../models/league.model';


@Component({
  selector: 'app-league-list',
  templateUrl: './league-list.component.html',
  styleUrls: ['./league-list.component.css']
})
export class LeagueListComponent {
  leagues: League[] = [];

  constructor(private leagueService: LeagueService) {}

  ngOnInit(): void {
    this.getLeagues();
  }

  getLeagues(): void {
    this.leagueService.getAll().subscribe(data => {
      this.leagues = data;
    });
  }

  deleteLeague(id: number): void {
    this.leagueService.delete(id).subscribe(() => {
      this.leagues = this.leagues.filter(league => league.id !== id);
    });
  }
}
