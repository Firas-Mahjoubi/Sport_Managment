package com.example.sport_backend.ServiceImpl.Matches;

import com.example.sport_backend.Entity.ClubHouse.League;
import com.example.sport_backend.Entity.ClubHouse.Team;
import com.example.sport_backend.Entity.Enum.Categories;
import com.example.sport_backend.Entity.Matchs.Match;
import com.example.sport_backend.Entity.Matchs.MatchDetailsResponseDto;
import com.example.sport_backend.Entity.Matchs.MatchResponseDto;
import com.example.sport_backend.Repositories.ClubHouse.TeamRepositories;
import com.example.sport_backend.Repositories.matches.MatchesRepo;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.sql.Time;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.*;
import java.util.stream.Collectors;

@AllArgsConstructor
@Service
public class matchService {
    private final MatchesRepo matchesRepo;
    private final TeamRepositories teamRepo;


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
    public Map<String, List<MatchResponseDto>> getMatchesByGameWeek(int gameWeek) {
        String currentSeason = determineSeason(LocalDate.now()); // Determine current season dynamically

        // Fetch matches for the given game week and current season
        List<Match> matches = matchesRepo.findByGameWeekAndSeason(gameWeek, currentSeason);
        System.out.println("Fetched Matches: " + matches.size());  // ✅ Debugging

        return matches.stream()
                .filter(match -> match.getHomeTeam() != null && match.getAwayTeam() != null) // Ensure valid teams
                .collect(Collectors.groupingBy(match -> {
                    // Find home team and get league name
                    Optional<Team> homeTeamOpt = teamRepo.findByName(match.getHomeTeam());

                    homeTeamOpt.ifPresent(team ->
                            System.out.println("Found Team: " + team.getId()) // ✅ Debug team fetching
                    );

                    return homeTeamOpt
                            .map(team -> (team.getClub() != null && team.getClub().getLeague() != null)
                                    ? team.getClub().getLeague().getName() // ✅ Return League Name
                                    : "Unknown League" // Handle missing league
                            )
                            .orElse("Unknown League");
                }, Collectors.mapping(match -> {
                    // Fetch logos
                    String homeTeamLogo = teamRepo.findByName(match.getHomeTeam())
                            .map(Team::getLogoUrl)
                            .orElse("default-home-logo.png");

                    String awayTeamLogo = teamRepo.findByName(match.getAwayTeam())
                            .map(Team::getLogoUrl)
                            .orElse("default-away-logo.png");

                    // Convert Match entity to MatchResponseDto
                    return new MatchResponseDto(
                            match.getId(),
                            match.getHomeTeam(),
                            match.getAwayTeam(),
                            homeTeamLogo,
                            awayTeamLogo,
                            match.getStadium(),
                            match.getResult(),
                            match.getGameWeek(),
                            match.getSeason(),
                            LocalDateTime.of(match.getDate(), match.getStartTime().toLocalTime()) // Ensure LocalDateTime
                    );
                }, Collectors.toList())));
    }

    public MatchDetailsResponseDto getMatchById(Long matchId) {
        Optional<Match> matchOpt = matchesRepo.findById(matchId);

        if (matchOpt.isEmpty()) {
            throw new RuntimeException("Match not found with ID: " + matchId);
        }

        Match match = matchOpt.get();

        // Fetch home and away teams
        Team homeTeam = teamRepo.findByName(match.getHomeTeam()).orElse(null);
        Team awayTeam = teamRepo.findByName(match.getAwayTeam()).orElse(null);

        // Fetch team logos
        String homeTeamLogo = (homeTeam != null) ? homeTeam.getLogoUrl() : "default-home-logo.png";
        String awayTeamLogo = (awayTeam != null) ? awayTeam.getLogoUrl() : "default-away-logo.png";

        // Fetch the league details (assuming a team belongs to one club, which belongs to one league)
        League league = (homeTeam != null && homeTeam.getClub() != null) ? homeTeam.getClub().getLeague() : null;

        String leagueName = (league != null) ? league.getName() : "Unknown League";
        String leagueLogo = (league != null) ? league.getLogourl() : "default-league-logo.png";
        String leagueNation = (league != null) ? league.getNation() : "Unknown Nation";

        return new MatchDetailsResponseDto(
                match.getId(),
                match.getHomeTeam(),
                match.getAwayTeam(),
                homeTeamLogo,
                awayTeamLogo,
                match.getStadium(),
                match.getResult(),
                match.getGameWeek(),
                match.getSeason(),
                LocalDateTime.of(match.getDate(), match.getStartTime().toLocalTime()),
                leagueName,
                leagueLogo,
                leagueNation
        );
    }



    private static int generateMatchesForCategory(List<Team> teams, LocalDate startDate, int gameWeek, List<Match> matches) {
        int totalTeams = teams.size();
        if (totalTeams < 2 || totalTeams % 2 != 0) return gameWeek; // Ensure even number of teams

        List<Team> tempTeams = new ArrayList<>(teams);
        Team fixedTeam = tempTeams.remove(0); // Keep one team fixed for balancing

        int totalRounds = totalTeams - 1; // Each team plays against all others once
        for (int round = 0; round < totalRounds; round++) {
            for (int i = 0; i < totalTeams / 2; i++) {
                Team home = (i == 0) ? fixedTeam : tempTeams.get(i - 1);
                Team away = tempTeams.get(totalTeams - 2 - i);

                matches.add(createMatch(home, away, startDate.plusWeeks(gameWeek - 1), gameWeek));
            }

            // Rotate teams (excluding the fixed team)
            Collections.rotate(tempTeams, 1);
            gameWeek++;
        }

        // Generate reverse fixtures (home-away switch)
        for (int round = 0; round < totalRounds; round++) {
            for (int i = 0; i < totalTeams / 2; i++) {
                Team away = (i == 0) ? fixedTeam : tempTeams.get(i - 1);
                Team home = tempTeams.get(totalTeams - 2 - i);

                matches.add(createMatch(home, away, startDate.plusWeeks(gameWeek - 1), gameWeek));
            }

            // Rotate teams again for reverse fixtures
            Collections.rotate(tempTeams, 1);
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
