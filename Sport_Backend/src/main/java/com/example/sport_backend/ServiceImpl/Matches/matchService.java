package com.example.sport_backend.ServiceImpl.Matches;


import com.example.sport_backend.Entity.ClubHouse.League;
import com.example.sport_backend.Entity.ClubHouse.Team;
import com.example.sport_backend.Entity.Enum.Categories;
import com.example.sport_backend.Entity.Matchs.Match;
import com.example.sport_backend.Repositories.matches.MatchesRepo;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.sql.Time;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.Comparator;
import java.util.List;
import java.util.stream.Collectors;

@AllArgsConstructor
@Service
public class matchService  {
    private final MatchesRepo matchesRepo;

    public List<Match> generateSeasonMatches(League league, LocalDate startDate) {
        List<Match> matches = new ArrayList<>();

        // Fetch all teams in the league
        List<Team> teams = league.getClubs()
                .stream()
                .flatMap(club -> club.getTeams().stream())
                .collect(Collectors.toList());

        // Categorizing teams
        List<Team> seniorTeams = teams.stream()
                .filter(team -> team.getCategories() == Categories.SENIOR)
                .collect(Collectors.toList());

        List<Team> juniorTeams = teams.stream()
                .filter(team -> team.getCategories() == Categories.JUNIOR)
                .collect(Collectors.toList());

        int gameWeek = 1;
        gameWeek = generateMatchesForCategory(seniorTeams, startDate, gameWeek, matches);
        gameWeek = generateMatchesForCategory(juniorTeams, startDate, gameWeek, matches);

        // Sort matches by gameWeek before saving
        matches.sort(Comparator.comparingInt(Match::getGameWeek));

        // Save generated matches
        matchesRepo.saveAll(matches);

        return matches;
    }

    private static int generateMatchesForCategory(List<Team> teams, LocalDate startDate, int gameWeek, List<Match> matches) {
        int totalTeams = teams.size();
        if (totalTeams < 2) return gameWeek; // Not enough teams to create matches

        // Create a list of team indices for round-robin scheduling
        List<Integer> teamIndices = new ArrayList<>();
        for (int i = 0; i < totalTeams; i++) {
            teamIndices.add(i);
        }

        // Iterate through each game week for the first half of the season
        for (int week = 0; week < totalTeams - 1; week++) {
            // Schedule matches for the current game week
            for (int i = 0; i < totalTeams / 2; i++) {
                Team homeTeam = teams.get(teamIndices.get(i));
                Team awayTeam = teams.get(teamIndices.get(totalTeams - 1 - i));

                // Home match for home team
                matches.add(createMatch(homeTeam, awayTeam, startDate.plusWeeks(gameWeek - 1), gameWeek));
            }

            // Rotate teams for the next game week (round-robin)
            teamIndices.add(1, teamIndices.remove(teamIndices.size() - 1));

            // Increment game week
            gameWeek++;
        }

        // Generate reverse fixtures for the second half of the season
        for (int week = 0; week < totalTeams - 1; week++) {
            // Schedule matches for the current game week
            for (int i = 0; i < totalTeams / 2; i++) {
                Team awayTeam = teams.get(teamIndices.get(i)); // Swap home and away
                Team homeTeam = teams.get(teamIndices.get(totalTeams - 1 - i)); // Swap home and away

                // Away match for home team (reverse fixture)
                matches.add(createMatch(homeTeam, awayTeam, startDate.plusWeeks(gameWeek - 1), gameWeek));
            }

            // Rotate teams for the next game week (round-robin)
            teamIndices.add(1, teamIndices.remove(teamIndices.size() - 1));

            // Increment game week
            gameWeek++;
        }

        return gameWeek;
    }

    private static Match createMatch(Team home, Team away, LocalDate date, int gameWeek) {
        Match match = new Match();
        match.setHomeTeam(home.getName());
        match.setAwayTeam(away.getName());
        match.setDate(date);
        match.setStartTime(Time.valueOf("20:00:00")); // Default start time at 20:00
        match.setStadium(home.getStadium()); // Home team's stadium
        match.setResult(null); // Result will be updated later
        match.setTeams(List.of(home, away)); // Add both teams to match
        match.setSeason(determineSeason(date)); // Set season dynamically
        match.setGameWeek(gameWeek); // Assign game week
        return match;
    }

    private static String determineSeason(LocalDate date) {
        int year = date.getYear();
        int month = date.getMonthValue();

        if (month >= 1 && month <= 8) {
            return (year - 1) + "/" + year;
        } else {
            return year + "/" + (year + 1);
        }
    }
}
