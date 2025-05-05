package com.example.sport_backend.payload;

import com.example.sport_backend.Entity.Enum.Categories;

public class TeamAlertDTO {
    private String teamName;
    private String clubName;
    private long playerCount;
    private String alert;

    public TeamAlertDTO(Categories teamCategory, String clubName, long playerCount, String alert) {
        this.teamName = teamCategory.toString(); // ou use .name()
        this.clubName = clubName;
        this.playerCount = playerCount;
        this.alert = alert;
    }


    public String getTeamName() { return teamName; }
    public String getClubName() { return clubName; }
    public long getPlayerCount() { return playerCount; }
    public String getAlert() { return alert; }
}
