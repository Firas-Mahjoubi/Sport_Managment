package com.example.sport_backend.Entity.Matchs;


import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class GoalResponseDTO {
    private Long id;
    private String scorerFirstName;
    private String scorerLastName;
    private String assisterFirstName;
    private String assisterLastName;
    private Integer timing;   // 5th parameter
    private String Result;    // 6th parameter (String)
    private boolean isHomeGoal;  // 7th parameter (boolean)
}


