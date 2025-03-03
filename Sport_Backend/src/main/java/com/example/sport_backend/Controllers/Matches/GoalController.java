package com.example.sport_backend.Controllers.Matches;

import com.example.sport_backend.Entity.Matchs.Goal;
import com.example.sport_backend.Entity.Matchs.GoalResponseDTO;
import com.example.sport_backend.ServiceImpl.Matches.GoalService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RequiredArgsConstructor
@RestController
@CrossOrigin(origins = "*")

public class GoalController {
    private final GoalService goalService;
    @GetMapping("/goalsformatch/{matchId}")
    public ResponseEntity<List<GoalResponseDTO>> getGoalsForMatch(@PathVariable Long matchId) {
        List<GoalResponseDTO> goals = goalService.getGoalsForMatch(matchId);
        return ResponseEntity.ok(goals);
    }

    @DeleteMapping("/deleteGoal/{goalId}")
    public void deleteGoal(@PathVariable Long goalId) {
        goalService.deleteGoal(goalId);
    }
    @GetMapping("/count")
    public ResponseEntity<Long> getGoalsByPlayerAndTeam(
            @RequestParam String firstName,
            @RequestParam String lastName,
            @RequestParam String teamName) {

        Long goalCount = goalService.getGoalsByPlayerAndTeam(firstName, lastName, teamName);
        return ResponseEntity.ok(goalCount);
    }

    @PostMapping("/addGoal/{matchId}")
    public ResponseEntity<Goal> addGoal(@PathVariable Long matchId,
                                        @RequestBody Goal goal,
                                        @RequestParam boolean isHomeGoal) {
        // Call the service to add the goal, including the assister
        Goal savedGoal = goalService.addGoal(matchId,
                goal.getScorerNumber(),
                goal.getAssisterNumber(),
                goal.getTiming(),
                isHomeGoal);

        // Return the saved goal as a response
        return ResponseEntity.ok(savedGoal);
    }

}

