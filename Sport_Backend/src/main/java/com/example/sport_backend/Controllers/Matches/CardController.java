package com.example.sport_backend.Controllers.Matches;

import com.example.sport_backend.Entity.Matches.Card;
import com.example.sport_backend.Entity.Matches.Match;
import com.example.sport_backend.Repositories.matches.CardRepo;
import com.example.sport_backend.Repositories.matches.MatchesRepo;
import com.example.sport_backend.ServiceImpl.Matches.CardService;
import lombok.RequiredArgsConstructor;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RequiredArgsConstructor
@RestController
public class CardController {
    private final CardService cardService;

    @PostMapping("addCard/{matchId}")
    public Card addCard(@PathVariable Long matchId, @RequestBody Card card) {
        return cardService.addCard(matchId, card);
    }



}
