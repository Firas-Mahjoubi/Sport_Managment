package com.example.sport_backend.Entity.Matchs;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor

public class MatchDetailsResponseDto {
    Long id;
    String homeTeam;
    String awayTeam;
    String homeTeamLogo;
    String awayTeamLogo;
    String stadium;
    String result;
    Integer gameWeek;
    String season;
    LocalDateTime matchDateTime;

    String leagueName;
    String leagueLogo;
    String leagueNation;
}
