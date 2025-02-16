package com.example.sport_backend.ServiceImpl.Matches;


import com.example.sport_backend.Entity.ClubHouse.Player;
import com.example.sport_backend.Entity.ClubHouse.Team;
import com.example.sport_backend.Entity.Matchs.Goal;
import com.example.sport_backend.Entity.Matchs.Match;
import com.example.sport_backend.Repositories.ClubHouse.TeamRepositories;
import com.example.sport_backend.Repositories.matches.GoalRepo;
import com.example.sport_backend.Repositories.matches.MatchesRepo;
import jakarta.transaction.Transactional;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

@AllArgsConstructor
@Service
public class GoalService  {
    private final GoalRepo goalRepo;
    private final MatchesRepo matchRepo;
    private final TeamRepositories teamRepo;




    public Long getGoalsByPlayerAndTeam(String firstName, String lastName, String teamName) {
        return goalRepo.countGoalsByPlayerAndTeam(firstName, lastName, teamName);
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
    public Goal addGoal(Long matchId, Integer scorerNumber, Integer timing, boolean isHomeGoal) {
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

        // Create and save the goal
        Goal goal = new Goal();
        goal.setScorer(scorer);
        goal.setTiming(timing);
        goal.setMatch(match);
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

