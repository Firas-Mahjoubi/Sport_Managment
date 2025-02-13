package com.example.sport_backend.Controllers.Tactic;

import com.example.sport_backend.Entity.Tactic.Tactic;
import com.example.sport_backend.ServiceInterface.Tactic.ITacticService;
import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@AllArgsConstructor
@RequestMapping("/api/tactics")
@CrossOrigin(origins = "*") // Allow CORS for frontend access

public class TacticController {
    @PostMapping("createTactic")
    public Tactic createTactic(@RequestBody Tactic tactic) {
        return tacticService.createTactic(tactic);
    }
    @PutMapping("/updateTactic/{id}")
    public Tactic updateTactic(@PathVariable Long id,@RequestBody Tactic updatedTactic) {
        return tacticService.updateTactic(id, updatedTactic);
    }
    @DeleteMapping("/deleteTactic/{id}")
    public void deleteTactic(@PathVariable Long id) {
        tacticService.deleteTactic(id);
    }
    @GetMapping("/all")
    public List<Tactic> getAllTactics() {
        return tacticService.getAllTactics();
    }
    @GetMapping("/team/{teamId}")
    public List<Tactic> getTacticsByTeam(@PathVariable Long teamId) {
        return tacticService.getTacticsByTeam(teamId);
    }

    private final ITacticService tacticService;
}
