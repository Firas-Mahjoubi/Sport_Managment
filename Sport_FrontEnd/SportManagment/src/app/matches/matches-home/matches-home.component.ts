import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

interface League {
  id: number;
  name: string;
  logourl: string;
  nation: string;
}

interface MatchResponseDto {
  id: number;
  homeTeam: string;
  awayTeam: string;
  homeTeamLogo: string;
  awayTeamLogo: string;
  stadium: string;
  result: string | null;
  gameWeek: number;
  season: string;
  startTime: string;
}

@Component({
  selector: 'app-matches-home',
  templateUrl: './matches-home.component.html',
  styleUrls: ['./matches-home.component.css']
})
export class MatchesHomeComponent implements OnInit {
  leagues: League[] = [];
  matchesByLeague: { [league: string]: MatchResponseDto[] } = {};
  selectedGameWeek: number = 1;
  apiUrl = 'http://localhost:8088';

  constructor(private http: HttpClient, private router: Router) {}

  ngOnInit(): void {
    this.fetchLeagues();
    this.fetchMatches();
  }

  fetchLeagues(): void {
    this.http.get<League[]>(`${this.apiUrl}/leagues/getallleague`).subscribe(
      (data) => {
        this.leagues = data;
      },
      (error) => {
        console.error('Error fetching leagues:', error);
      }
    );
  }

  fetchMatches(): void {
    const url = `${this.apiUrl}/get-matches-by-game-week?gameWeek=${this.selectedGameWeek}`;
    this.http.get<{ [league: string]: MatchResponseDto[] }>(url).subscribe(
      (data) => {
        this.matchesByLeague = data;
      },
      (error) => {
        console.error('Error fetching matches:', error);
      }
    );
  }

  goToMatchDetails(matchId: number) {
    this.router.navigate(['/match', matchId]);
  }

  onGameWeekSelected(gameWeek: number) {
    if (this.selectedGameWeek !== gameWeek) {
      this.selectedGameWeek = gameWeek;
      this.fetchMatches();
    }
  }
}
