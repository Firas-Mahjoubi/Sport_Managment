package com.example.sport_backend.Controllers.ClubHouse;

import com.example.sport_backend.Entity.ClubHouse.Player;
import com.example.sport_backend.ServiceImpl.ClubHouse.PlayerServiceIMPL;
import org.springframework.web.bind.annotation.*;

import java.util.List;

public class PlayerController {
    private PlayerServiceIMPL playerServiceIMPL;

    @GetMapping("/getallplayers")
    public List<Player> getAllPlayers() {
        return playerServiceIMPL.getAllPlayers();
    }

    @GetMapping("/getplayer/{id}")
    public Player getPlayerById(@PathVariable Long id) {
        return playerServiceIMPL.getPlayerById(id);
    }

    @PostMapping("/addplayer")
    public Player addPlayer(@RequestBody Player player) {
        return playerServiceIMPL.addPlayer(player);
    }

    @DeleteMapping("/deleteplayer/{id}")
    public void deletePlayer(@PathVariable Long id) {
        playerServiceIMPL.deletePlayer(id);
    }

    @PutMapping("/updateplayer/{id}")
    public Player updatePlayer(@PathVariable Long id, @RequestBody Player player) {
        return playerServiceIMPL.updatePlayer(id, player);
    }
}
