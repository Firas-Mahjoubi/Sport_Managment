package com.example.sport_backend.ServiceImpl.ClubHouse;

import com.example.sport_backend.Entity.ClubHouse.Player;
import com.example.sport_backend.Repositories.ClubHouse.PlayerRepo;
import com.example.sport_backend.ServiceInterface.ClubHouse.IPlayerService;
import com.example.sport_backend.ServiceInterface.ClubHouse.ITeamService;

import java.util.List;

public class PlayerServiceIMPL implements IPlayerService {
    public PlayerRepo playerRepo;

    @Override
    public List<Player> getAllPlayers() {
        return playerRepo.findAll();
    }

    @Override
    public Player getPlayerById(Long id) {
        return playerRepo.findById(id).orElse(null);
    }

    @Override
    public Player addPlayer(Player player) {
        return playerRepo.save(player);
    }

    @Override
    public void deletePlayer(Long id) {
    playerRepo.deleteById(id);
    }

    @Override
    public Player updatePlayer(Long id, Player player) {
       player.setId(id);
        return playerRepo.save(player);
    }
}
