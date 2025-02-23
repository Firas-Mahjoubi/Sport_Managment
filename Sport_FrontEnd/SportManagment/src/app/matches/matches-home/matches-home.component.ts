import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

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
export class MatchesHomeComponent {
  matchesByLeague: { [league: string]: MatchResponseDto[] } = {};
  selectedGameWeek: number = 1;

  constructor(private http: HttpClient) {}

  fetchMatches(): void {
    const apiUrl = `http://localhost:8088/get-matches-by-game-week?gameWeek=${this.selectedGameWeek}`;
    this.http.get<{ [league: string]: MatchResponseDto[] }>(apiUrl).subscribe(
      (data) => {
        this.matchesByLeague = data;
      },
      (error) => {
        console.error('Error fetching matches:', error);
      }
    );
  }

  onGameWeekSelected(gameWeek: number) {
    this.selectedGameWeek = gameWeek;
    this.fetchMatches();
  }

  protected readonly Object = Object;
}
