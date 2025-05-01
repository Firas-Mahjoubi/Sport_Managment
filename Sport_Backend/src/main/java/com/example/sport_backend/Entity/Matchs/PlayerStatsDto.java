package com.example.sport_backend.Entity.Matchs;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class PlayerStatsDto {
    private int playerNumber;
    private String fullName;
    private String teamName;
    private int goals;
    private String image;
}
