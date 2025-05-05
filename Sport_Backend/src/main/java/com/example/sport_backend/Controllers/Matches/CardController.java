package com.example.sport_backend.Controllers.Matches;

import com.example.sport_backend.Entity.Matchs.*;
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
    @GetMapping("/top-red/{leagueId}")
    public List<CardStatsDto> getTopRedCardPlayersByLeague(@PathVariable Long leagueId) {
        return cardService.getTopRedCardPlayers(leagueId);
    }

    @GetMapping("/top-yellow/{leagueId}")
    public List<CardStatsDto> getTopYellowCardPlayersByLeague(@PathVariable Long leagueId) {
        return cardService.getTopYellowCardPlayers(leagueId);
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
