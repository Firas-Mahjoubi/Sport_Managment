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
    @PostMapping("createTactic/{idTeam}/{idUser}")
    public Tactic createTactic(@RequestBody Tactic tactic ,@PathVariable long idTeam,@PathVariable long idUser) {
        return tacticService.createTactic(tactic, idTeam,idUser);
    }
    @PutMapping("/updateTactic/{id}")
    public Tactic updateTactic(@PathVariable Long id,@RequestBody Tactic updatedTactic) {
        return tacticService.updateTactic(id, updatedTactic);
    }
    @DeleteMapping("/deleteTactic/{id}")
    public void deleteTactic(@PathVariable Long id) {
        tacticService.deleteTactic(id);
    }
    @GetMapping("")
    public List<Tactic> getAllTactics() {
        return tacticService.getAllTactics();
    }
    @GetMapping("/team/{teamId}")
    public List<Tactic> getTacticsByTeam(@PathVariable Long teamId) {
        return tacticService.getTacticsByTeam(teamId);
    }
    @GetMapping("/user/{userId}")
    public List<Tactic> getTacticsByUser(@PathVariable Long userId) {
        return tacticService.getTacticsByUser(userId);
    }


    private final ITacticService tacticService;
}
