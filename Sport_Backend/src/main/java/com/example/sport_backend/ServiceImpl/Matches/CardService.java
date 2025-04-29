package com.example.sport_backend.ServiceImpl.Matches;

import com.example.sport_backend.Entity.ClubHouse.Player;
import com.example.sport_backend.Entity.ClubHouse.Team;
import com.example.sport_backend.Entity.Matchs.Card;
import com.example.sport_backend.Entity.Matchs.CardDTO;
import com.example.sport_backend.Entity.Matchs.CardType;
import com.example.sport_backend.Entity.Matchs.Match;
import com.example.sport_backend.Repositories.ClubHouse.TeamRepositories;
import com.example.sport_backend.Repositories.matches.CardRepo;
import com.example.sport_backend.Repositories.matches.MatchesRepo;
import com.opencsv.CSVReader;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

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
    public List<CardDTO> getCardsForMatch(Long matchId) {
        // Fetch the match
        Match match = matchRepo.findById(matchId)
                .orElseThrow(() -> new RuntimeException("Match not found"));

        // Retrieve all cards for the given match
        return cardRepo.findByMatch(match)
                .stream()
                .map(card -> new CardDTO(
                        card.getId(),
                        card.getCardTime(),
                        card.getCardType(),
                        card.getCardTaker().getFirstName(),
                        card.getCardTaker().getLastName(),
                        card.getNumberOfPlayer(),
                        card.getForHomeTeam() // Return boolean instead of team name
                ))
                .collect(Collectors.toList());
    }

    @Transactional(readOnly = true)
    public Long countRedCardsForPlayer(String firstName, String lastName, String teamName) {
        return cardRepo.countCardsByPlayerAndTeam(firstName, lastName, teamName, CardType.RED);
    }

    @Transactional(readOnly = true)
    public Long countYellowCardsForPlayer(String firstName, String lastName, String teamName) {
        return cardRepo.countCardsByPlayerAndTeam(firstName, lastName, teamName, CardType.YELLOW);
    }

    // NEW: Method for CSV upload
    @Transactional
    public String uploadCardsFromCsv(Long matchId, MultipartFile file) throws IOException {
        Match match = matchRepo.findById(matchId)
                .orElseThrow(() -> new RuntimeException("Match not found"));

        List<Card> cards = new ArrayList<>();

        try (BufferedReader reader = new BufferedReader(new InputStreamReader(file.getInputStream()));
             CSVReader csvReader = new CSVReader(reader)) {

            // Skip header row
            String[] headers = csvReader.readNext();
            if (headers == null) {
                throw new IllegalArgumentException("CSV file is empty.");
            }

            String[] line;
            while ((line = csvReader.readNext()) != null) {
                if (line.length < 4) {
                    throw new IllegalArgumentException("Invalid CSV format: Each row must have 4 columns.");
                }

                Card card = new Card();
                card.setCardType(CardType.valueOf(line[0].trim().toUpperCase())); // CardType (YELLOW/RED)
                int playerNumber = Integer.parseInt(line[1].trim());              // PlayerNumber
                boolean isHomeTeam = Boolean.parseBoolean(line[2].trim());        // IsHomeTeam
                card.setCardTime(Integer.parseInt(line[3].trim()));               // CardTime

                // Validate data
                if (playerNumber < 1 || playerNumber > 99) {
                    throw new IllegalArgumentException("Player number must be between 1 and 99.");
                }
                if (card.getCardTime() < 1 || card.getCardTime() > 130) {
                    throw new IllegalArgumentException("Card time must be between 1 and 130.");
                }

                // Reuse existing addCard method
                cards.add(addCard(matchId, isHomeTeam, playerNumber, card));
            }
        } catch (Exception e) {
            throw new IOException("Error processing CSV file: " + e.getMessage(), e);
        }

        return "Successfully uploaded " + cards.size() + " cards.";
    }
}