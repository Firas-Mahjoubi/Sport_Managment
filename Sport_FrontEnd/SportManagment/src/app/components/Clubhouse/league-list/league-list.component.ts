import { Component } from '@angular/core';
import { LeagueService,League } from 'src/app/services/league.service'; 

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
      this.leagues = data.map(league => ({
        ...league,
        logourl: league.logourl ? league.logourl : 'assets/default-logo.png', // ✅ Définit un logo par défaut si null
        country: league.nation 
      }));
      console.log("🔹 Data after processing :", this.leagues);
    });
  }

  deleteLeague(id: number): void {
    this.leagueService.delete(id).subscribe(() => {
      this.leagues = this.leagues.filter(league => league.id !== id);
    });
  }
}
