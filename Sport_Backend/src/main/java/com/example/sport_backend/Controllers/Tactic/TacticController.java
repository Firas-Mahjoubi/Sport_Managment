package com.example.sport_backend.Controllers.Tactic;

import com.example.sport_backend.Entity.Enum.TrainingFocus;
import com.example.sport_backend.Entity.Tactic.Tactic;
import com.example.sport_backend.Repositories.Tactic.TacticRepositories;
import com.example.sport_backend.ServiceInterface.Tactic.ITacticService;
import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@RestController
@AllArgsConstructor
@RequestMapping("/api/tactics")
@CrossOrigin(origins = "*") // Allow CORS for frontend access

public class TacticController {
    private final TacticRepositories tacticRepositories;

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



    @GetMapping("/formation-percentage")
    public Map<String, Double> getFormationPercentage() {
        // Fetch all tactics
        List<Tactic> tactics = tacticRepositories.findAll();

        // Calculate the percentage for each formation
        double formation442 = Tactic.calculateFormationPercentage("4-4-2", tactics);
        double formation433 = Tactic.calculateFormationPercentage("4-3-3", tactics);
        double formation352 = Tactic.calculateFormationPercentage("3-5-2", tactics);
        double formation532 = Tactic.calculateFormationPercentage("5-3-2", tactics);

        // Return the percentages as a map
        return Map.of(
                "4-4-2", formation442,
                "4-3-3", formation433,
                "3-5-2", formation352,
                "5-3-2", formation532
        );
    }
    @GetMapping("/formation-percentage-by-focus")
    public Map<String, Map<String, Double>> getFormationPercentageByFocus() {
        // Fetch all tactics
        List<Tactic> tactics = tacticRepositories.findAll();

        // Create a map to hold the percentage of each formation per training focus
        Map<String, Map<String, Double>> formationPercentages = new HashMap<>();

        // Iterate through each training focus
        for (TrainingFocus focus : TrainingFocus.values()) {
            Map<String, Double> formationData = new HashMap<>();

            // Filter tactics by training focus and calculate formation percentages
            List<Tactic> filteredTactics = tactics.stream()
                    .filter(tactic -> tactic.getTrainingFocus() == focus)
                    .collect(Collectors.toList());

            // Calculate the formation percentage for each formation within this training focus
            formationData.put("4-4-2", Tactic.calculateFormationPercentage("4-4-2", filteredTactics));
            formationData.put("4-3-3", Tactic.calculateFormationPercentage("4-3-3", filteredTactics));
            formationData.put("3-5-2", Tactic.calculateFormationPercentage("3-5-2", filteredTactics));
            formationData.put("5-3-2", Tactic.calculateFormationPercentage("5-3-2", filteredTactics));

            // Add formation data for this training focus to the result map
            formationPercentages.put(focus.name(), formationData);
        }

        return formationPercentages;
    }



    private final ITacticService tacticService;
}
