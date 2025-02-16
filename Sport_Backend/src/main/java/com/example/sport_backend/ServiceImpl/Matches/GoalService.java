package com.example.sport_backend.ServiceImpl.Matches;


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
    public Goal addGoal(Long matchId, Integer scorerNumber,  Integer timing, boolean isHomeGoal) {
        // Retrieve the match
        Match match = matchRepo.findById(matchId)
                .orElseThrow(() -> new RuntimeException("Match not found"));

        // Retrieve the scoring team (home or away) based on the team name stored in the match
        Team scoringTeam = getTeamByName(isHomeGoal ? match.getHomeTeam() : match.getAwayTeam());

        // Validate that the scorer is in the scoring team
        boolean scorerExists = scoringTeam.getPlayers() != null && scoringTeam.getPlayers().stream()
                .anyMatch(player -> player.getPlayerNumber().equals(scorerNumber));
        if (!scorerExists) {
            throw new RuntimeException("Scorer with number " + scorerNumber + " not found in team " + scoringTeam.getName());
        }

        // Validate that the assister (if provided) is in the scoring team


        // Create and save the goal
        Goal goal = new Goal();
        goal.setScorerNumber(scorerNumber);
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



}

