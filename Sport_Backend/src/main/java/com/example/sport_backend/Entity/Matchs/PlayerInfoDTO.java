package com.example.sport_backend.Entity.Matchs;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class PlayerInfoDTO {
    private String firstName;
    private String lastName;
    private String position;
    private boolean isHomeTeam;
}
