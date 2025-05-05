package com.example.sport_backend.Controllers.ClubHouse;

import com.example.sport_backend.payload.TeamAlertDTO;
import com.example.sport_backend.payload.TeamPlayerCountDTO;
import com.example.sport_backend.Entity.ClubHouse.Player;
import com.example.sport_backend.Entity.ClubHouse.PlayerRequest;
import com.example.sport_backend.Repositories.ClubHouse.PlayerRepo;
import com.example.sport_backend.ServiceInterface.ClubHouse.IPlayerService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.util.List;
@RestController
@RequiredArgsConstructor
@RequestMapping("players")
@CrossOrigin(origins = "*")
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
    public Player addPlayer(@ModelAttribute PlayerRequest player) throws IOException {
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


    // ✅ Nouveau endpoint pour récupérer les joueurs sans HealthRecord
    @GetMapping("/players/without-healthrecord")
    public List<Player> getPlayersWithoutHealthRecord() {
        return iPlayerService.getPlayersWithoutHealthRecord();
    }

    private final PlayerRepo playerRepository;
    @GetMapping("/image/{id}")
    public ResponseEntity<byte[]> getImage(@PathVariable Long id) {
        Player player = playerRepository.findById(id).orElseThrow();
        byte[] image = player.getImageUrl(); // type byte[]

        return ResponseEntity.ok()
                .contentType(MediaType.IMAGE_JPEG) // ou IMAGE_PNG selon ton image
                .body(image);
    }

    @GetMapping("/sorted")
    public List<Player> getSortedPlayers(
            @RequestParam String field,
            @RequestParam(defaultValue = "asc") String direction
    ) {
        return iPlayerService.getSortedPlayers(field, direction);
    }

    @GetMapping("/players-per-team")
    public List<TeamPlayerCountDTO> getPlayersPerTeam() {
        return iPlayerService.getPlayerCountsPerTeam();
    }

    @GetMapping("/alerts/team-roster")
    public List<TeamAlertDTO> getTeamAlerts() {
        return iPlayerService.getTeamRosterAlerts();
    }



    ///////////////////////////////////

}
