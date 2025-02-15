package com.example.sport_backend.ServiceImpl.Matches;

import com.example.sport_backend.Entity.ClubHouse.Player;
import com.example.sport_backend.Entity.ClubHouse.Team;
import com.example.sport_backend.Entity.Matches.Card;
import com.example.sport_backend.Entity.Matches.Match;
import com.example.sport_backend.Repositories.ClubHouse.TeamRepo;
import com.example.sport_backend.Repositories.matches.CardRepo;
import com.example.sport_backend.Repositories.matches.MatchesRepo;
import com.example.sport_backend.ServiceInterface.Matches.ICardService;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@AllArgsConstructor
@Service
public class CardService implements ICardService {
    private final CardRepo cardRepo;
    private final MatchesRepo matchRepo;
    private  final  TeamRepo teamRepo;
    @Transactional
    public Card addCard(long matchId, boolean isHomeTeam, int playerNumber, Card card) {
        // Fetch the match
        Match match = matchRepo.findById(matchId)
                .orElseThrow(() -> new RuntimeException("Match not found"));

        // Determine which team is involved (home or away)
        Team assignedTeam = null;
        String assignedTeam1= null;
        if (isHomeTeam) {
            // Get the home team
            assignedTeam1 = match.getHomeTeam();
        } else {
            // Get the away team
            assignedTeam1 = match.getAwayTeam();
        }
        assignedTeam = teamRepo.findByName(assignedTeam1).orElse(null);

        if (assignedTeam == null) {
            throw new RuntimeException("Team not found in this match");
        }

        // Find the player by number within the assigned team
        Player player = assignedTeam.getPlayers().stream()
                .filter(p -> p.getPlayerNumber().equals(playerNumber))
                .findFirst()
                .orElseThrow(() -> new RuntimeException("Player not found in the specified team"));

        // Assign match, player, and team info to the card
        card.setMatch(match);
        card.setNumberOfPlayer(playerNumber);
        card.setForHomeTeam(isHomeTeam);  // true if home team, false if away team

        return cardRepo.save(card);
    }

}
