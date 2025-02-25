package com.example.sport_backend.Entity.Matchs;

import lombok.*;
import lombok.experimental.FieldDefaults;

import java.time.LocalDateTime;
import java.util.List;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class MatchResponseDto {
    Long id;
    String homeTeam;
    String awayTeam;
    String homeTeamLogo;
    String awayTeamLogo;
    String stadium;
    String result;
    Integer gameWeek;
    String season;
    LocalDateTime startTime;
}
