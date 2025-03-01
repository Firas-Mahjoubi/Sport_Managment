import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';

interface GoalResponseDTO {
  scorerFirstName: string;
  scorerLastName: string;
  assisterFirstName: string;
  assisterLastName: string;
  timing: number;
  Result: string;
  isHomeGoal: boolean;
}

interface CardDTO {
  cardTime: number;
  cardType: string;
  cardTakerFirstName: string;
  cardTakerLastName: string;
  numberOfPlayer: number;
  forHomeTeam: boolean;
}

interface SubstitutionInfoDTO {
  minuteOfPlay: number;
  playerInFirstName: string;
  playerInLastName: string;
  playerOutFirstName: string;
  playerOutLastName: string;
  isHomeTeam: boolean;
}
interface MatchDetailsDTO {
  leagueName: string;
  leagueNation: string;
  leagueLogo: string;
  homeTeam: string;
  homeTeamLogo: string;
  awayTeam: string;
  awayTeamLogo: string;
  result: string | null;
}

@Component({
  selector: 'app-match-details',
  templateUrl: './match-details.component.html',
  styleUrls: ['./match-details.component.css']
})
export class MatchDetailsComponent implements OnInit {
  matchId!: number;
  matchDetails: MatchDetailsDTO | null = null;

  goals: GoalResponseDTO[] = [];
  cards: CardDTO[] = [];
  substitutions: SubstitutionInfoDTO[] = [];

  constructor(private route: ActivatedRoute, private http: HttpClient) {}

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.matchId = Number(params.get('matchId'));
      console.log('Match ID:', this.matchId);
      if (this.matchId) {
        this.fetchMatchDetails();
      }
    });
  }

  fetchMatchDetails() {
    if (!this.matchId) {
      console.error("Match ID is not defined.");
      return;
    }

    console.log(`Fetching details for Match ID: ${this.matchId}`);

    // Fetch match details
    this.http.get<MatchDetailsDTO>(`http://localhost:8088/get-match-details/${this.matchId}`)
      .subscribe({
        next: data => {
          this.matchDetails = data;
          console.log("Match details fetched successfully:", data);
        },
        error: err => console.error("Error fetching match details:", err)
      });
    this.http.get<GoalResponseDTO[]>(`http://localhost:8088/goalsformatch/${this.matchId}`)
      .subscribe({
        next: data => this.goals = data,
        error: err => console.error("Error fetching goals:", err)
      });

    this.http.get<CardDTO[]>(`http://localhost:8088/getcardsformatch/${this.matchId}`)
      .subscribe({
        next: data => this.cards = data,
        error: err => console.error("Error fetching cards:", err)
      });

    this.http.get<SubstitutionInfoDTO[]>(`http://localhost:8088/api/matches/substitutions/getSubstitution/${this.matchId}`)
      .subscribe({
        next: data => this.substitutions = data,
        error: err => console.error("Error fetching substitutions:", err)
      });
  }
}
