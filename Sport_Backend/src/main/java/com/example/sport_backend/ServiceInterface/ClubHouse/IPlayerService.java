package com.example.sport_backend.ServiceInterface.ClubHouse;

import com.example.sport_backend.payload.TeamAlertDTO;
import com.example.sport_backend.payload.TeamPlayerCountDTO;
import com.example.sport_backend.Entity.ClubHouse.Player;
import com.example.sport_backend.Entity.ClubHouse.PlayerRequest;

import java.io.IOException;
import java.util.List;

public interface IPlayerService {
    public List<Player> getAllPlayers();
    public Player getPlayerById(Long id);
    public Player addPlayer(PlayerRequest player) throws IOException;
    public void deletePlayer(Long id);
    public Player updatePlayer(Long id, Player player);
    List<TeamPlayerCountDTO> getPlayerCountsPerTeam();
    List<TeamAlertDTO> getTeamRosterAlerts();
///



    // ✅ Ajouter la méthode pour récupérer les joueurs sans HealthRecord
    List<Player> getPlayersWithoutHealthRecord();

    List<Player> getSortedPlayers(String field, String direction);
}
