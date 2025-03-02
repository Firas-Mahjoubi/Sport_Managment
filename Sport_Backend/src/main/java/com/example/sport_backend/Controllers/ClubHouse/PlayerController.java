package com.example.sport_backend.Controllers.ClubHouse;

import com.example.sport_backend.Entity.ClubHouse.Player;
import com.example.sport_backend.ServiceImpl.ClubHouse.PlayerServiceIMPL;
import com.example.sport_backend.ServiceInterface.ClubHouse.IPlayerService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
@RestController
@RequiredArgsConstructor
@RequestMapping("players")
@CrossOrigin("*")
public class PlayerController {
    @Autowired
    private IPlayerService iPlayerService;


    @GetMapping("/getallplayers")
    public List<Player> getAllPlayers() {
        return iPlayerService.getAllPlayers();
    }

    @GetMapping("/getplayer/{id}")
    public Player getPlayerById(@PathVariable Long id) {
        return iPlayerService.getPlayerById(id);
    }

    @PostMapping("/addplayer")
    public Player addPlayer(@RequestBody Player player) {
        return iPlayerService.addPlayer(player);
    }

    @DeleteMapping("/deleteplayer/{id}")
    public void deletePlayer(@PathVariable Long id) {
        iPlayerService.deletePlayer(id);
    }

    @PutMapping("/updateplayer/{id}")
    public Player updatePlayer(@PathVariable Long id, @RequestBody Player player) {
        return iPlayerService.updatePlayer(id, player);
    }
}
