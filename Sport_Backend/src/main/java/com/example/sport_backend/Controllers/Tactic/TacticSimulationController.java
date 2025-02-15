package com.example.sport_backend.Controllers.Tactic;

import com.example.sport_backend.Entity.Tactic.TacticSimulation;
import com.example.sport_backend.ServiceInterface.Tactic.ITacticSimulationService;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@AllArgsConstructor
@RequestMapping("/api/tactic-simulations")
@CrossOrigin(origins = "*")
public class TacticSimulationController {
    @PostMapping("add")
    public TacticSimulation createSimulation(@RequestBody TacticSimulation simulation) {
        return tacticSimulationService.createSimulation(simulation);
    }
    @GetMapping("tactic/{tacticId}")
    public List<TacticSimulation> getSimulationsByTactic(@PathVariable Long tacticId) {
        return tacticSimulationService.getSimulationsByTactic(tacticId);
    }
    @DeleteMapping("delete/{id}")
    public void deleteSimulation(@PathVariable Long id) {
        tacticSimulationService.deleteSimulation(id);
    }

    private final ITacticSimulationService tacticSimulationService;

}
