package com.example.sport_backend.Entity.Matchs;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class CardStatsDto {
    private String fullName;
    private String image;
    private String teamName;
    private int numberOfCards;
}
