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
    public LineUp createTeamLineUp(Long matchId, boolean isHomeTeam, LineUp lineUpRequest) {
        // Fetch the match by ID
        Match match = matchRepo.findById(matchId)
                .orElseThrow(() -> new RuntimeException("Match not found"));

        // Get the team name based on isHomeTeam flag
        String teamName = isHomeTeam ? match.getHomeTeam() : match.getAwayTeam();

        if (teamName == null) {
            throw new RuntimeException("Team name not found for this match");
        }

        // Fetch the actual Team entity by name
        Team team = teamRepo.findByName(teamName)
                .orElseThrow(() -> new RuntimeException("Team not found with name: " + teamName));

        // Use the request payload's data
        List<Long> playerNumbers = lineUpRequest.getTeamplayerNumbers();
        List<Long> subsNumbers = lineUpRequest.getTeamplayerSubsNumbers();

        // Create the LineUp object
        LineUp lineUp = new LineUp();
        lineUp.setMatch(match);
        lineUp.setFormation(lineUpRequest.getFormation());
        lineUp.setIsHomeTeam(isHomeTeam);

        // Set players from request payload
        lineUp.setTeamplayerNumbers(playerNumbers);
        lineUp.setTeamplayerSubsNumbers(subsNumbers);

        return lineUpRepo.save(lineUp);
    }

    public LineUp getLineupForMatchAndTeam(Long matchId, boolean isHomeTeam) {
        Match match = matchRepo.findById(matchId)
                .orElseThrow(() -> new RuntimeException("Match not found"));

        if (isHomeTeam) {
            return lineUpRepo.findByMatchAndIsHomeTeam(match, true)
                    .orElseThrow(() -> new RuntimeException("Home team lineup not found for match"));
        } else {
            return lineUpRepo.findByMatchAndIsHomeTeam(match, false)
                    .orElseThrow(() -> new RuntimeException("Away team lineup not found for match"));
        }
    }
}
