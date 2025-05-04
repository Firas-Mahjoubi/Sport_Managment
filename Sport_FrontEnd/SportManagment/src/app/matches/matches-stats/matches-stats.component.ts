import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

interface League {
  id: number;
  name: string;
  logourl: string;
  nation: string;
}

interface PlayerStats {
  playerNumber: number;
  fullName: string;
  teamName: string;
  goals: number;
  image: string;
}

interface CardStats {
  fullName: string;
  teamName: string;
  image: string;
  numberOfCards: number;
}

interface ChartData {
  label: string;
  red: number;
  yellow: number;
  goals: number;
}

@Component({
  selector: 'app-matches-stats',
  templateUrl: './matches-stats.component.html',
  styleUrls: ['./matches-stats.component.css']
})
export class MatchesStatsComponent implements OnInit {
  leagues: League[] = [];
  selectedLeagueId?: number;
  openedLeagueId?: number;

  topScorer?: PlayerStats;
  redCardStats: CardStats[] = [];
  yellowCardStats: CardStats[] = [];

  // ✅ Include 'charts' here
  activeStatType: 'scorer' | 'red' | 'yellow' | 'charts' | null = null;

  // ✅ New property for chart data
  chartData: ChartData[] = [];

  error?: string;

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.http.get<League[]>('http://localhost:8088/leagues/getallleague').subscribe({
      next: (data) => this.leagues = data,
      error: () => this.error = 'Failed to load leagues'
    });
  }

  toggleLeagueDropdown(leagueId: number): void {
    this.openedLeagueId = this.openedLeagueId === leagueId ? undefined : leagueId;
  }

  showStats(leagueId: number, type: 'scorer' | 'red' | 'yellow'): void {
    this.selectedLeagueId = leagueId;
    this.activeStatType = type;
    this.error = undefined;

    this.topScorer = undefined;
    this.redCardStats = [];
    this.yellowCardStats = [];

    if (type === 'scorer') {
      this.http.get<PlayerStats>(`http://localhost:8088/topscorer/${leagueId}`).subscribe({
        next: (data) => this.topScorer = data,
        error: () => this.error = 'Failed to load top scorer'
      });
    } else if (type === 'red') {
      this.http.get<CardStats[]>(`http://localhost:8088/top-red/${leagueId}`).subscribe({
        next: (data) => this.redCardStats = data,
        error: () => this.error = 'Failed to load red card stats'
      });
    } else if (type === 'yellow') {
      this.http.get<CardStats[]>(`http://localhost:8088/top-yellow/${leagueId}`).subscribe({
        next: (data) => this.yellowCardStats = data,
        error: () => this.error = 'Failed to load yellow card stats'
      });
    }
  }

  showCharts(leagueId: number): void {
    this.selectedLeagueId = leagueId;
    this.activeStatType = 'charts';
    this.error = undefined;
    this.chartData = [];

    const scorer$ = this.http.get<PlayerStats>(`http://localhost:8088/topscorer/${leagueId}`).toPromise();
    const red$ = this.http.get<CardStats[]>(`http://localhost:8088/top-red/${leagueId}`).toPromise();
    const yellow$ = this.http.get<CardStats[]>(`http://localhost:8088/top-yellow/${leagueId}`).toPromise();

    Promise.all([scorer$, red$, yellow$])
      .then(([topScorer, redCards, yellowCards]) => {
        const chart: ChartData[] = [];

        if (topScorer) {
          chart.push({
            label: topScorer.fullName,
            goals: topScorer.goals,
            red: 0,
            yellow: 0
          });
        }

        if (redCards) {
          redCards.forEach(player => {
            const existing = chart.find(c => c.label === player.fullName);
            if (existing) {
              existing.red = player.numberOfCards;
            } else {
              chart.push({
                label: player.fullName,
                red: player.numberOfCards,
                yellow: 0,
                goals: 0
              });
            }
          });
        }

        if (yellowCards) {
          yellowCards.forEach(player => {
            const existing = chart.find(c => c.label === player.fullName);
            if (existing) {
              existing.yellow = player.numberOfCards;
            } else {
              chart.push({
                label: player.fullName,
                yellow: player.numberOfCards,
                red: 0,
                goals: 0
              });
            }
          });
        }

        this.chartData = chart;
      })
      .catch(() => {
        this.error = 'Failed to load chart stats';
      });
  }
}
