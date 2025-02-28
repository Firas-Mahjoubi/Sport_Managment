package com.example.sport_backend.Controllers.Matches;

import com.example.sport_backend.Entity.Matchs.LineUp;
import com.example.sport_backend.Entity.Matchs.PlayerInfoDTO;
import com.example.sport_backend.ServiceImpl.Matches.LineupService;
import com.example.sport_backend.ServiceImpl.Matches.LineupService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import lombok.AllArgsConstructor;

import java.util.Map;

@RestController
@RequestMapping("/lineups")
@AllArgsConstructor
@CrossOrigin(origins = "*")

public class LineupController {

    private final LineupService lineUpService;

    @PostMapping("/create/{matchId}")
    public ResponseEntity<LineUp> createLineUp(
            @PathVariable Long matchId,
            @RequestParam boolean isHomeTeam,
            @RequestBody LineUp lineUp) {

        // Create LineUp using the service
        LineUp createdLineUp = lineUpService.createTeamLineUp(matchId, isHomeTeam, lineUp);

        // Return the created LineUp
        return ResponseEntity.ok(createdLineUp);
    }
    @GetMapping("/getlineupPlayers/{matchId}")
    public Map<Long, PlayerInfoDTO> getPlayerDetailsForLineup(
            @PathVariable Long matchId,
            @RequestParam boolean isHomeTeam) {
        return lineUpService.getPlayerNamesForLineup(matchId, isHomeTeam);
    }


}
