package com.example.sport_backend.Entity.Matchs;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class CardDTO {
    private Integer cardTime;
    private CardType cardType;
    private String cardTakerFirstName;
    private String cardTakerLastName;
    private Integer numberOfPlayer;
    private Boolean forHomeTeam; // Change from team name to boolean
}
