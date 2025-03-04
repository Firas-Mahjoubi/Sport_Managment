package com.example.sport_backend.Controllers.Matches;

import com.example.sport_backend.Entity.Matchs.Substitution;
import com.example.sport_backend.Entity.Matchs.SubstitutionInfoDTO;
import com.example.sport_backend.ServiceImpl.Matches.SubstitutionService;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@AllArgsConstructor
@RestController
@RequestMapping("/api/matches/substitutions")
@CrossOrigin(origins = "*")

public class SubstitutionController {

    private final SubstitutionService substitutionService;

    @PostMapping("createSubstitution/{matchId}")
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
    @GetMapping("/getSubstitution/{matchId}")
    public List<SubstitutionInfoDTO> getSubstitutions(@PathVariable Long matchId) {
        return substitutionService.getSubstitutionsForMatch(matchId);
    }
    @DeleteMapping("deleteSubstitution/{substitutionId}")
    public ResponseEntity<String> deleteSubstitution(@PathVariable Long substitutionId) {
        substitutionService.deleteSubstitution(substitutionId);
        return ResponseEntity.ok("Substitution deleted successfully");
    }
}
