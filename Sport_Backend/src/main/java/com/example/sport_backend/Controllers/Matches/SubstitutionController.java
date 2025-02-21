package com.example.sport_backend.Controllers.Matches;

import com.example.sport_backend.Entity.Matchs.Substitution;
import com.example.sport_backend.ServiceImpl.Matches.SubstitutionService;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

@AllArgsConstructor
@RestController
@RequestMapping("/api/matches/substitutions")
public class SubstitutionController {

    private final SubstitutionService substitutionService;

    @PostMapping("/{matchId}")
    @ResponseStatus(HttpStatus.CREATED)
    public Substitution createSubstitution(
            @PathVariable Long matchId,
            @RequestParam Integer minuteOfPlay,
            @RequestParam Integer playerInNumber,
            @RequestParam Integer playerOutNumber,
            @RequestParam boolean isHomeTeam) {
        return substitutionService.createSubstitution(
                matchId,
                minuteOfPlay,
                playerInNumber,
                playerOutNumber,
                isHomeTeam
        );
    }
}
