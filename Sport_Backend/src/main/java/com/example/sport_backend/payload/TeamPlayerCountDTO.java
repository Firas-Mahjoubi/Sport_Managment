package com.example.sport_backend.payload;


import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class TeamPlayerCountDTO {

    private String teamName;
    private String clubName;
    private Long playerCount;

    public TeamPlayerCountDTO(Enum categories, String clubName, Long playerCount) {
        this.teamName = categories.toString(); // convert enum to string
        this.clubName = clubName;
        this.playerCount = playerCount;
    }
}
