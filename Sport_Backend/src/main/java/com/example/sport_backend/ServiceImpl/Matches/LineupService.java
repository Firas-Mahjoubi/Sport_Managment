package com.example.sport_backend.ServiceImpl.Matches;

import com.example.sport_backend.Entity.ClubHouse.Team;
import com.example.sport_backend.Entity.Matchs.LineUp;
import com.example.sport_backend.Entity.Matchs.Match;
import com.example.sport_backend.Repositories.ClubHouse.TeamRepositories;
import com.example.sport_backend.Repositories.matches.LineUpRepo;
import com.example.sport_backend.Repositories.matches.MatchesRepo;
import jakarta.transaction.Transactional;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@AllArgsConstructor
@Service
public class LineupService {
    private final LineUpRepo lineUpRepo;
    private final MatchesRepo matchRepo;
    private final TeamRepositories teamRepo;


    @Transactional
    public LineUp createTeamLineUp(Long matchId, boolean isHomeTeam) {
        // Fetch the match by ID
        Match match = matchRepo.findById(matchId)
                .orElseThrow(() -> new RuntimeException("Match not found"));

        // Get the team name based on the isHomeTeam flag
        String teamName = isHomeTeam ? match.getHomeTeam() : match.getAwayTeam();

        if (teamName == null) {
            throw new RuntimeException("Team name not found for this match");
        }

        // Fetch the actual Team entity by name
        Team team = teamRepo.findByName(teamName)
                .orElseThrow(() -> new RuntimeException("Team not found with name: " + teamName));

        // Extract player numbers for the starting 11 players and substitutes
        List<Long> playerNumbers = team.getPlayers().stream()
                .limit(11)  // Main 11 players
                .map(player -> (long) player.getPlayerNumber())  // Convert Integer to Long
                .collect(Collectors.toList());

        // Extract substitute numbers (up to 7 substitutes)
        List<Long> subsNumbers = team.getPlayers().stream()
                .skip(11)  // The next 7 players are substitutes
                .limit(7)
                .map(player -> (long) player.getPlayerNumber())  // Convert Integer to Long
                .collect(Collectors.toList());

        // Create the LineUp object and set match details
        LineUp lineUp = new LineUp();
        lineUp.setMatch(match);

        if (isHomeTeam) {
            lineUp.setHomeTeamplayerNumbers(playerNumbers);
            lineUp.setHomeTeamplayerSubsNumbers(subsNumbers);
        } else {
            lineUp.setAwayTeamPlayerNumbers(playerNumbers);
            lineUp.setAwayTeamPlayerSubsNumbers(subsNumbers);
        }

        // Save the LineUp object
        return lineUpRepo.save(lineUp);
    }

}
