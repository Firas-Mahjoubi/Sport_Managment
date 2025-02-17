package com.example.sport_backend.Controllers.Matches;

import com.example.sport_backend.Entity.Matchs.LineUp;
import com.example.sport_backend.ServiceImpl.Matches.LineupService;
import com.example.sport_backend.ServiceImpl.Matches.LineupService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import lombok.AllArgsConstructor;

@RestController
@RequestMapping("/lineups")
@AllArgsConstructor
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
}
