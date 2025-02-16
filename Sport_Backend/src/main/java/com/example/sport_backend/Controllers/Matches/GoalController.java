package com.example.sport_backend.Controllers.Matches;

import com.example.sport_backend.Entity.Matchs.Goal;
import com.example.sport_backend.ServiceImpl.Matches.GoalService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RequiredArgsConstructor
@RestController
public class GoalController {
    private final GoalService goalService;
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
        // Call the service to add the goal and pass the necessary information
        Goal savedGoal = goalService.addGoal(matchId, goal.getScorerNumber(),
                goal.getTiming(), isHomeGoal);

        // Return the saved goal as a response
        return ResponseEntity.ok(savedGoal);
    }
}

