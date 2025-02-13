package com.example.sport_backend.Controllers.Tactic;

import com.example.sport_backend.Entity.Tactic.PlayerMovement;
import com.example.sport_backend.ServiceInterface.Tactic.IPlayerMovementService;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@AllArgsConstructor
@RequestMapping("/api/player-movements")
@CrossOrigin(origins = "*")
public class PlayerMovementController {
    @PostMapping("add")
    public PlayerMovement addMovement(@RequestBody PlayerMovement movement) {
        return playerMovementService.addMovement(movement);
    }
    @GetMapping("tactic/{tacticId}")
    public List<PlayerMovement> getMovementsByTactic(@PathVariable Long tacticId) {
        return playerMovementService.getMovementsByTactic(tacticId);
    }
    @DeleteMapping("delete/{id}")
    public void deleteMovement(@PathVariable Long id) {
        playerMovementService.deleteMovement(id);
    }

    private final IPlayerMovementService playerMovementService;
}
