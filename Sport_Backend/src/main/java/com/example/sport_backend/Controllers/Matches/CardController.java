package com.example.sport_backend.Controllers.Matches;

import com.example.sport_backend.Entity.Matches.Card;
import com.example.sport_backend.Entity.Matches.Match;
import com.example.sport_backend.Repositories.matches.CardRepo;
import com.example.sport_backend.Repositories.matches.MatchesRepo;
import com.example.sport_backend.ServiceImpl.Matches.CardService;
import lombok.RequiredArgsConstructor;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

@RequiredArgsConstructor
@RestController
public class CardController {
    private final CardService cardService;

    @PostMapping("addCard/{matchId}")
    public Card addCard(@PathVariable Long matchId, @RequestParam boolean isHomeTeam, @RequestBody Card card) {
        return cardService.addCard(matchId, isHomeTeam, card.getNumberOfPlayer(), card);
    }



}
