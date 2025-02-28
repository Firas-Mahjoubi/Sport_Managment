package com.example.sport_backend.Entity.Matchs;


import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class SubstitutionInfoDTO {
    private int minuteOfPlay;
    private String playerInFirstName;
    private String playerInLastName;
    private String playerOutFirstName;
    private String playerOutLastName;
    private boolean isHomeTeam; // Add this field

}