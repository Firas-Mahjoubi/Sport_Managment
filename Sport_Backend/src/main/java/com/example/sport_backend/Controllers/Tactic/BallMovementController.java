package com.example.sport_backend.Controllers.Tactic;

import com.example.sport_backend.Entity.Tactic.BallMovement;
import com.example.sport_backend.Repositories.Tactic.BallMovementRepositorie;
import com.example.sport_backend.ServiceInterface.Tactic.IBallMovementService;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@AllArgsConstructor
@RequestMapping("/api/ball-movements")
@CrossOrigin(origins = "*")
public class BallMovementController {


    @PostMapping("add")
    public BallMovement addBallMovement(@RequestBody BallMovement movement) {
        return ballMovementService.addBallMovement(movement);
    }
    @GetMapping("tactic/{tacticId}")
    public List<BallMovement> getBallMovementsByTactic(@PathVariable Long tacticId) {
        return ballMovementService.getBallMovementsByTactic(tacticId);
    }
    @DeleteMapping("delete/{id}")
    public void deleteBallMovement(@PathVariable Long id) {
        ballMovementService.deleteBallMovement(id);
    }

    private final IBallMovementService ballMovementService;

}
