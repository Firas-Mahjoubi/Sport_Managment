package com.example.sport_backend.ServiceImpl.Matches;


import com.example.sport_backend.Entity.ClubHouse.Player;
import com.example.sport_backend.Entity.ClubHouse.Team;
import com.example.sport_backend.Entity.Matchs.*;
import com.example.sport_backend.Repositories.ClubHouse.PlayerRepo;
import com.example.sport_backend.Repositories.ClubHouse.TeamRepositories;
import com.example.sport_backend.Repositories.matches.GoalRepo;
import com.example.sport_backend.Repositories.matches.MatchesRepo;
import jakarta.transaction.Transactional;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@AllArgsConstructor
@Service
public class GoalService  {
    private final GoalRepo goalRepo;
    private final MatchesRepo matchRepo;
    private final TeamRepositories teamRepo;
    private final PlayerRepo playerRepo;

    public Long getGoalsByPlayerAndTeam(String firstName, String lastName, String teamName) {
        return goalRepo.countGoalsByPlayerAndTeam(firstName, lastName, teamName);
    }
    public PlayerStatsDto getTopScorerInLeague(Long leagueId) {
        List<Goal> goals = goalRepo.findGoalsByLeagueId(leagueId);

        // Count goals by Player
        Map<Player, Integer> goalCounts = new HashMap<>();
        for (Goal goal : goals) {
            Player scorer = goal.getScorer();
            if (scorer != null) {
                goalCounts.put(scorer, goalCounts.getOrDefault(scorer, 0) + 1);
            }
        }

        // Find the player with the most goals
        Player topScorer = goalCounts.entrySet().stream()
                .max(Map.Entry.comparingByValue())
                .map(Map.Entry::getKey)
                .orElseThrow(() -> new RuntimeException("No goals with scorers found"));

        int goalsCount = goalCounts.get(topScorer);
        String teamName = topScorer.getTeam() != null ? topScorer.getTeam().getName() : "Unknown Team";
        String fullName = topScorer.getFirstName() + " " + topScorer.getLastName();
        String image = topScorer.getImage();

        return new PlayerStatsDto(topScorer.getPlayerNumber(), fullName, teamName, goalsCount, image);
    }




    @Transactional
    public void deleteGoal(Long goalId) {
        // Retrieve the goal to be deleted
        Goal goal = goalRepo.findById(goalId)
                .orElseThrow(() -> new RuntimeException("Goal not found with ID: " + goalId));

        // Get the match and determine if it was a home or away goal
        Match match = goal.getMatch();
        boolean isHomeGoal = match.getHomeTeam().equals(goal.getScorer().getTeam().getName());

        // Delete the goal
        goalRepo.delete(goal);

        // Update the match result after goal deletion
        updateMatchResultAfterDeletion(match, isHomeGoal);
    }

    @Transactional
    public Goal addGoal(Long matchId, Integer scorerNumber, Integer assisterNumber, Integer timing, boolean isHomeGoal) {
        // Retrieve the match
        Match match = matchRepo.findById(matchId)
                .orElseThrow(() -> new RuntimeException("Match not found"));

        // Retrieve the scoring team (home or away)
        Team scoringTeam = getTeamByName(isHomeGoal ? match.getHomeTeam() : match.getAwayTeam());

        // Find the player who scored
        Player scorer = scoringTeam.getPlayers().stream()
                .filter(player -> player.getPlayerNumber().equals(scorerNumber))
                .findFirst()
                .orElseThrow(() -> new RuntimeException("Scorer with number " + scorerNumber + " not found in team " + scoringTeam.getName()));

        // Find the player who assisted (if provided)
        Player assister = null;
        if (assisterNumber != null) {
            assister = scoringTeam.getPlayers().stream()
                    .filter(player -> player.getPlayerNumber().equals(assisterNumber))
                    .findFirst()
                    .orElseThrow(() -> new RuntimeException("Assister with number " + assisterNumber + " not found in team " + scoringTeam.getName()));
        }

        // Create and save the goal
        Goal goal = new Goal();
        goal.setScorer(scorer);
        goal.setAssisterNumber(assisterNumber);
        goal.setTiming(timing);
        goal.setMatch(match);
        goal.setIsHomeTeam(isHomeGoal);
        goalRepo.save(goal);

        // Update match result
        updateMatchResult(match, isHomeGoal);

        return goal;
    }

    private Team getTeamByName(String teamName) {
        return teamRepo.findByName(teamName)
                .orElseThrow(() -> new RuntimeException("Team not found: " + teamName));
    }

    private void updateMatchResult(Match match, boolean isHomeGoal) {
        if (match.getResult() == null || match.getResult().isEmpty()) {
            match.setResult("0-0");
        }

        // Parse the current match result
        String[] resultParts = match.getResult().split("-");
        int homeGoals = Integer.parseInt(resultParts[0]);
        int awayGoals = Integer.parseInt(resultParts[1]);

        // Increment goals accordingly
        if (isHomeGoal) {
            homeGoals++;
        } else {
            awayGoals++;
        }

        // Update the match result
        match.setResult(homeGoals + "-" + awayGoals);
        matchRepo.save(match);
    }

    public List<GoalResponseDTO> getGoalsForMatch(Long matchId) {
        Match match = matchRepo.findById(matchId)
                .orElseThrow(() -> new RuntimeException("Match not found"));

        List<Goal> goals = goalRepo.findByMatch(match);

        return goals.stream()
                .map(goal -> {
                    // Handle potential null values for isHomeTeam
                    Boolean isHomeTeam = goal.getIsHomeTeam();
                    if (isHomeTeam == null) {
                        System.out.println("Warning: isHomeTeam is null for goal ID " + goal.getId());
                        isHomeTeam = true; // Default to home team if null
                    }

                    String teamName = isHomeTeam ? match.getHomeTeam() : match.getAwayTeam();

                    // Find the team by name
                    Team team = teamRepo.findByName(teamName)
                            .orElseThrow(() -> new RuntimeException("Team not found: " + teamName));

                    // Find the assister
                    Player assister = (goal.getAssisterNumber() != null) ?
                            playerRepo.findByTeamAndPlayerNumber(team, goal.getAssisterNumber()).orElse(null) : null;

                    return new GoalResponseDTO(
                            goal.getId(),
                            goal.getScorer().getFirstName(),
                            goal.getScorer().getLastName(),
                            (assister != null) ? assister.getFirstName() : null,
                            (assister != null) ? assister.getLastName() : null,
                            goal.getTiming(),
                            match.getResult(),
                            isHomeTeam  // Now safely returns true/false
                    );
                })
                .collect(Collectors.toList());
    }

    private void updateMatchResultAfterDeletion(Match match, boolean isHomeGoal) {
        if (match.getResult() == null || match.getResult().isEmpty()) {
            match.setResult("0-0");
        }

        // Parse the current match result
        String[] resultParts = match.getResult().split("-");
        int homeGoals = Integer.parseInt(resultParts[0]);
        int awayGoals = Integer.parseInt(resultParts[1]);

        // Decrement goals accordingly
        if (isHomeGoal) {
            homeGoals--;
        } else {
            awayGoals--;
        }

        // Update the match result
        match.setResult(homeGoals + "-" + awayGoals);
        matchRepo.save(match);
    }

}
