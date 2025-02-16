package com.example.sport_backend.ServiceImpl.Matches;

import com.example.sport_backend.Entity.ClubHouse.Player;
import com.example.sport_backend.Entity.ClubHouse.Team;
import com.example.sport_backend.Entity.Matchs.Card;
import com.example.sport_backend.Entity.Matchs.CardType;
import com.example.sport_backend.Entity.Matchs.Match;
import com.example.sport_backend.Repositories.ClubHouse.TeamRepositories;
import com.example.sport_backend.Repositories.matches.CardRepo;
import com.example.sport_backend.Repositories.matches.MatchesRepo;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@AllArgsConstructor
@Service
public class CardService {
    private final CardRepo cardRepo;
    private final MatchesRepo matchRepo;
    private final TeamRepositories teamRepo;

    public void deleteCard(Long cardId) {
        // Find the card by ID
        Card card = cardRepo.findById(cardId)
                .orElseThrow(() -> new RuntimeException("Card not found with ID: " + cardId));

        // Delete the card from the repository
        cardRepo.delete(card);
    }

    @Transactional
    public Card addCard(long matchId, boolean isHomeTeam, int playerNumber, Card card) {
        // Fetch the match
        Match match = matchRepo.findById(matchId)
                .orElseThrow(() -> new RuntimeException("Match not found"));

        // Determine which team is involved (home or away)
        String teamName = isHomeTeam ? match.getHomeTeam() : match.getAwayTeam();
        Team assignedTeam = teamRepo.findByName(teamName)
                .orElseThrow(() -> new RuntimeException("Team not found in this match"));

        // Find the player by number within the assigned team
        Player player = assignedTeam.getPlayers().stream()
                .filter(p -> p.getPlayerNumber().equals(playerNumber))
                .findFirst()
                .orElseThrow(() -> new RuntimeException("Player not found in the specified team"));

        // Assign match, player, and team info to the card
        card.setMatch(match);
        card.setNumberOfPlayer(playerNumber);
        card.setCardTaker(player);  // Link the card to the player
        card.setForHomeTeam(isHomeTeam);  // true if home team, false if away team

        return cardRepo.save(card);
    }
    @Transactional(readOnly = true)
    public Long countRedCardsForPlayer(String firstName, String lastName, String teamName) {
        return cardRepo.countCardsByPlayerAndTeam(firstName, lastName, teamName, CardType.RED);
    }

    @Transactional(readOnly = true)
    public Long countYellowCardsForPlayer(String firstName, String lastName, String teamName) {
        return cardRepo.countCardsByPlayerAndTeam(firstName, lastName, teamName, CardType.YELLOW);
    }
}
