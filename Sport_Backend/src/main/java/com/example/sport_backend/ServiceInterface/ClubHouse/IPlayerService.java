package com.example.sport_backend.ServiceInterface.ClubHouse;

import com.example.sport_backend.Entity.ClubHouse.Player;

import java.util.List;

public interface IPlayerService {
    public List<Player> getAllPlayers();
    public Player getPlayerById(Long id);
    public Player addPlayer(Player player);
    public void deletePlayer(Long id);
    public Player updatePlayer(Long id, Player player);
}
