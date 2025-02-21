package com.example.sport_backend.ServiceImpl.Matches;

import com.example.sport_backend.Entity.Matchs.LineUp;
import com.example.sport_backend.Entity.Matchs.Match;
import com.example.sport_backend.Entity.Matchs.Substitution;
import com.example.sport_backend.Repositories.matches.MatchesRepo;
import com.example.sport_backend.Repositories.matches.SubstitutionRepo;
import jakarta.transaction.Transactional;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

@AllArgsConstructor
@Service
public class SubstitutionService {

    private final SubstitutionRepo substitutionRepo;
    private final MatchesRepo matchRepo;
    private final LineupService lineupService; // To fetch lineups

    @Transactional
    public Substitution createSubstitution(Long matchId, Integer minuteOfPlay, Integer playerInNumber, Integer playerOutNumber, boolean isHomeTeam) {
        // Fetch the match by ID
        Match match = matchRepo.findById(matchId)
                .orElseThrow(() -> new RuntimeException("Match not found"));

        // Fetch only the lineup for the required team
        LineUp teamLineUp = lineupService.getLineupForMatchAndTeam(matchId, isHomeTeam);

        // Ensure that the players exist in the correct team's lineup
        if (!playerExistsInLineup(playerOutNumber, teamLineUp)) {
            throw new RuntimeException("Player out not found in the team's lineup"+teamLineUp.getTeamplayerSubsNumbers());
        }

        if (!playerExistsInLineup(playerInNumber, teamLineUp)) {
            throw new RuntimeException("Player in not found in the team's lineup");
        }

        // Create and save the substitution
        Substitution substitution = new Substitution();
        substitution.setMinuteOfPlay(minuteOfPlay);
        substitution.setPlayerInNumber(playerInNumber);
        substitution.setPlayerOutNumber(playerOutNumber);
        substitution.setIsHomeTeam(isHomeTeam);  // Set the home/away team flag
        substitution.setMatch(match);  // Set the match for this substitution
        substitution.setLineUp(teamLineUp);  // Set the correct lineup

        return substitutionRepo.save(substitution);
    }

        private boolean playerExistsInLineup(Integer playerNumber, LineUp lineUp) {
            return lineUp.getTeamplayerNumbers().contains(playerNumber.longValue())
                    || lineUp.getTeamplayerSubsNumbers().contains(playerNumber.longValue());
        }
}
