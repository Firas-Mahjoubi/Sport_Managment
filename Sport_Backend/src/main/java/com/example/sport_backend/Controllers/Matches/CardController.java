package com.example.sport_backend.Controllers.Matches;

import com.example.sport_backend.Entity.Matchs.Card;
import com.example.sport_backend.Entity.Matchs.CardDTO;
import com.example.sport_backend.Entity.Matchs.CardType;
import com.example.sport_backend.Entity.Matchs.Match;
import com.example.sport_backend.Repositories.matches.CardRepo;
import com.example.sport_backend.Repositories.matches.MatchesRepo;
import com.example.sport_backend.ServiceImpl.Matches.CardService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.util.ArrayList;
import java.util.List;

@RequiredArgsConstructor
@RestController
@CrossOrigin(origins = "*")

public class CardController {
    private final CardService cardService;

    @GetMapping("/getcardsformatch/{matchId}")
    public ResponseEntity<List<CardDTO>> getCardsForMatch(@PathVariable Long matchId) {
        List<CardDTO> cards = cardService.getCardsForMatch(matchId);
        return ResponseEntity.ok(cards);
    }
    // Updated endpoint for uploading CSV
    @PostMapping("/uploadCards/{matchId}")
    public ResponseEntity<String> uploadCards(
            @PathVariable long matchId,
            @RequestParam("file") MultipartFile file) {
        if (file.isEmpty()) {
            return ResponseEntity.badRequest().body("Please upload a CSV file.");
        }

        try (BufferedReader br = new BufferedReader(new InputStreamReader(file.getInputStream()))) {
            String line;
            List<Card> cards = new ArrayList<>();
            br.readLine(); // Skip header row (cardType,playerNumber,isHomeTeam,cardTime)

            while ((line = br.readLine()) != null) {
                String[] data = line.split(",");
                if (data.length != 4) {
                    return ResponseEntity.badRequest().body("Invalid CSV format. Expected: cardType,playerNumber,isHomeTeam,cardTime");
                }

                Card card = new Card();
                // Convert String to CardType enum
                try {
                    card.setCardType(CardType.valueOf(data[0].trim().toUpperCase())); // e.g., "YELLOW" -> CardType.YELLOW
                } catch (IllegalArgumentException e) {
                    return ResponseEntity.badRequest().body("Invalid card type: " + data[0] + ". Must be YELLOW or RED.");
                }
                card.setNumberOfPlayer(Integer.parseInt(data[1].trim()));
                boolean isHomeTeam = Boolean.parseBoolean(data[2].trim());
                card.setCardTime(Integer.parseInt(data[3].trim()));

                cardService.addCard(matchId, isHomeTeam, card.getNumberOfPlayer(), card);
                cards.add(card);
            }
            return ResponseEntity.ok("Successfully uploaded and processed " + cards.size() + " cards.");
        } catch (Exception e) {
            return ResponseEntity.status(500).body("Error processing CSV: " + e.getMessage());
        }
    }

    @PostMapping("addCard/{matchId}")
    public Card addCard(@PathVariable Long matchId, @RequestParam boolean isHomeTeam, @RequestBody Card card) {
        return cardService.addCard(matchId, isHomeTeam, card.getNumberOfPlayer(), card);
    }
    @GetMapping("/red-cards")
    public Long getRedCardsForPlayer(
            @RequestParam String firstName,
            @RequestParam String lastName,
            @RequestParam String teamName) {
        return cardService.countRedCardsForPlayer(firstName, lastName, teamName);
    }

    @GetMapping("/yellow-cards")
    public Long getYellowCardsForPlayer(
            @RequestParam String firstName,
            @RequestParam String lastName,
            @RequestParam String teamName) {
        return cardService.countYellowCardsForPlayer(firstName, lastName, teamName);
    }
    @DeleteMapping("/deleteCard/{cardId}")
    public void deleteCard(@PathVariable Long cardId) {
        cardService.deleteCard(cardId);
    }



}
