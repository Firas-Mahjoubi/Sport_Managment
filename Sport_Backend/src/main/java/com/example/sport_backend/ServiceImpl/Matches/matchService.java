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
import java.util.Collections;
import java.util.List;
import java.util.stream.Collectors;

@AllArgsConstructor
@Service
public class matchService {
    private final MatchesRepo matchesRepo;

    public List<Match> generateSeasonMatches(League league, LocalDate startDate) {
        List<Match> matches = new ArrayList<>();

        // Fetch all teams in the league
        List<Team> teams = league.getClubs()
                .stream()
                .flatMap(club -> club.getTeams().stream())
                .collect(Collectors.toList());

        // Categorizing teams (if necessary)
        List<Team> seniorTeams = teams.stream()
                .filter(team -> team.getCategories() == Categories.SENIOR)
                .collect(Collectors.toList());

        List<Team> juniorTeams = teams.stream()
                .filter(team -> team.getCategories() == Categories.JUNIOR)
                .collect(Collectors.toList());

        // Generate matches for senior teams and then junior teams
        int gameWeek = 1;
        gameWeek = generateMatchesForCategory(seniorTeams, startDate, gameWeek, matches);
        gameWeek = generateMatchesForCategory(juniorTeams, startDate, gameWeek, matches);

        // Shuffle matches for a random schedule (optional)
        Collections.shuffle(matches);

        // Save generated matches
        matchesRepo.saveAll(matches);

        return matches;
    }

    private static int generateMatchesForCategory(List<Team> teams, LocalDate startDate, int gameWeek, List<Match> matches) {
        int totalTeams = teams.size();
        if (totalTeams < 2) return gameWeek; // Not enough teams to create matches

        // Calculate the number of matches per game week
        int matchesPerGameWeek = totalTeams / 2;
        int matchCount = 0;

        // Generate the full home-and-away fixture list in one loop
        for (int i = 0; i < totalTeams; i++) {
            for (int j = i + 1; j < totalTeams; j++) {
                Team homeTeam = teams.get(i);
                Team awayTeam = teams.get(j);

                // Home match
                matches.add(createMatch(homeTeam, awayTeam, startDate, gameWeek));

                // Reverse fixture
                matches.add(createMatch(awayTeam, homeTeam, startDate.plusWeeks(teams.size() / 2), gameWeek));

                matchCount += 2;

                // Increment the game week after every matchesPerGameWeek matches
                if (matchCount % matchesPerGameWeek == 0) {
                    gameWeek++;
                }
            }
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
