package com.example.sport_backend.ServiceImpl.Matches;

import com.example.sport_backend.Entity.Matches.Card;
import com.example.sport_backend.Entity.Matches.Match;
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
    @Transactional
    public Card addCard(long mathcId, Card card){
        Match match = matchRepo.findById(mathcId).orElse(null);
        card.setMatch(match);
        return cardRepo.save(card);
    }
}
