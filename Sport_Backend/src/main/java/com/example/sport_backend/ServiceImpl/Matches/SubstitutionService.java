package com.example.sport_backend.ServiceImpl.Matches;

import com.example.sport_backend.Entity.ClubHouse.Player;
import com.example.sport_backend.Entity.ClubHouse.Team;
import com.example.sport_backend.Entity.Matchs.LineUp;
import com.example.sport_backend.Entity.Matchs.Match;
import com.example.sport_backend.Entity.Matchs.Substitution;
import com.example.sport_backend.Entity.Matchs.SubstitutionInfoDTO;
import com.example.sport_backend.Repositories.ClubHouse.TeamRepositories;
import com.example.sport_backend.Repositories.matches.MatchesRepo;
import com.example.sport_backend.Repositories.matches.SubstitutionRepo;
import jakarta.transaction.Transactional;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@AllArgsConstructor
@Service
public class SubstitutionService {

    private final SubstitutionRepo substitutionRepo;
    private final TeamRepositories teamRepositories;
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
    public List<SubstitutionInfoDTO> getSubstitutionsForMatch(Long matchId) {
        // Fetch the match
        Match match = matchRepo.findById(matchId)
                .orElseThrow(() -> new RuntimeException("Match not found"));

        // Fetch all substitutions for the match
        return substitutionRepo.findByMatch(match)
                .stream()
                .map(sub -> {
                    // Determine team name based on whether it's a home or away substitution
                    String teamName = sub.getIsHomeTeam() ? match.getHomeTeam() : match.getAwayTeam();

                    // Fetch the actual Team entity from the database
                    Team team = teamRepositories.findByName(teamName)
                            .orElseThrow(() -> new RuntimeException("Team not found: " + teamName));

                    // Find the "in" player
                    Player playerIn = team.getPlayers().stream()
                            .filter(p -> p.getPlayerNumber().equals(sub.getPlayerInNumber()))
                            .findFirst()
                            .orElseThrow(() -> new RuntimeException("Player in not found in team"));

                    // Find the "out" player
                    Player playerOut = team.getPlayers().stream()
                            .filter(p -> p.getPlayerNumber().equals(sub.getPlayerOutNumber()))
                            .findFirst()
                            .orElseThrow(() -> new RuntimeException("Player out not found in team"));

                    // Map to DTO, automatically including isHomeTeam from entity
                    return new SubstitutionInfoDTO(
                            sub.getId(),
                            sub.getMinuteOfPlay(),
                            playerIn.getFirstName(),
                            playerIn.getLastName(),
                            playerOut.getFirstName(),
                            playerOut.getLastName(),
                            sub.getIsHomeTeam() // Taken from the substitution entity
                    );
                })
                .collect(Collectors.toList());
    }
    @Transactional
    public void deleteSubstitution(Long substitutionId) {
        // Fetch the substitution by ID
        Substitution substitution = substitutionRepo.findById(substitutionId)
                .orElseThrow(() -> new RuntimeException("Substitution not found"));

        // Delete the substitution
        substitutionRepo.delete(substitution);
    }



}
