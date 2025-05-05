import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import axios, { AxiosResponse, AxiosError } from 'axios';




interface GoalResponseDTO {
  scorerFirstName: string;
  scorerLastName: string;
  assisterFirstName: string;
  assisterLastName: string;
  timing: number;
  Result: string;
  isHomeGoal: boolean;
  homeGoal?: boolean;
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
  homeTeam?: boolean;
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

  homeGoals: GoalResponseDTO[] = [];
  awayGoals: GoalResponseDTO[] = [];

  homeCards: CardDTO[] = [];
  awayCards: CardDTO[] = [];

  homeSubstitutions: SubstitutionInfoDTO[] = [];
  awaySubstitutions: SubstitutionInfoDTO[] = [];
  homePrediction: number | null = null;
  awayPrediction: number | null = null;

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

          if (this.matchDetails?.homeTeam && this.matchDetails?.awayTeam) {
            this.getPredictions(this.matchDetails.homeTeam, this.matchDetails.awayTeam);
          }

          // After fetching match details, fetch other data:
          this.fetchGoals();
          this.fetchCards();
          this.fetchSubstitutions();
        },
        error: err => console.error("Error fetching match details:", err)
      });
  }

  fetchGoals() {
    this.http.get<GoalResponseDTO[]>(`http://localhost:8088/goalsformatch/${this.matchId}`)
      .subscribe({
        next: data => {
          console.log("Raw Goals Data:", data);
          this.goals = data.map(goal => ({
            ...goal,
            isHomeGoal: goal.homeGoal === true // Correct boolean assignment
          }));
          this.homeGoals = this.goals.filter(goal => goal.isHomeGoal);
          this.awayGoals = this.goals.filter(goal => !goal.isHomeGoal);
          console.log("Home Goals:", this.homeGoals);
          console.log("Away Goals:", this.awayGoals);
        },
        error: err => console.error("Error fetching goals:", err)
      });
  }

  fetchCards() {
    this.http.get<CardDTO[]>(`http://localhost:8088/getcardsformatch/${this.matchId}`)
      .subscribe({
        next: data => {
          console.log("Cards fetched:", data);
          this.cards = data.map(card => ({
            ...card,
            forHomeTeam: card.forHomeTeam === true // Ensure boolean
          }));
          this.homeCards = this.cards.filter(card => card.forHomeTeam);
          this.awayCards = this.cards.filter(card => !card.forHomeTeam);
        },
        error: err => console.error("Error fetching cards:", err)
      });
  }

  fetchSubstitutions() {
    this.http.get<SubstitutionInfoDTO[]>(`http://localhost:8088/api/matches/substitutions/getSubstitution/${this.matchId}`)
      .subscribe({
        next: data => {
          console.log("Raw Substitutions Data:", data);
          this.substitutions = data.map(sub => ({
            ...sub,
            isHomeTeam: sub.homeTeam === true
          }));

          this.homeSubstitutions = this.substitutions.filter(sub => sub.isHomeTeam);
          this.awaySubstitutions = this.substitutions.filter(sub => !sub.isHomeTeam);

          console.log("Home Substitutions:", this.homeSubstitutions);
          console.log("Away Substitutions:", this.awaySubstitutions);
        },
        error: err => console.error("Error fetching substitutions:", err)
      });
  }

  getPredictions(homeTeam: string, awayTeam: string) {
    this.http.post<any>('http://localhost:5000/predict', { home_team: homeTeam, away_team: awayTeam })
      .subscribe({
        next: (response) => {
          console.log('Prediction Response:', response);
          this.homePrediction = response.predicted_home_goals;
          this.awayPrediction = response.predicted_away_goals;
        },
        error: (err) => console.error('Error fetching predictions:', err)
      });
  }





}
