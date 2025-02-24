package com.example.sport_backend.Controllers.Health;

import com.example.sport_backend.Entity.Health.RecoveryPlan;
import com.example.sport_backend.ServiceInterface.Health.IRecoveryPlanService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/recovery-plans")
@CrossOrigin(origins = "*") // Allow CORS for frontend access
public class RecoveryPlanController {

    @Autowired
    private IRecoveryPlanService recoveryPlanService;

    @GetMapping("getAllRecoveryPlans")
    public List<RecoveryPlan> getAllRecoveryPlans() {
        return recoveryPlanService.getAllRecoveryPlans();
    }

    @GetMapping("getRecoveryPlanById/{id}")
    public RecoveryPlan getRecoveryPlanById(@PathVariable Long id) {
        return recoveryPlanService.getRecoveryPlanById(id);
    }

    @PostMapping("createRecoveryPlan/{injuryId}/{playerId}")
    public RecoveryPlan createRecoveryPlan(@PathVariable Long injuryId, @PathVariable Long playerId, @RequestBody RecoveryPlan recoveryPlan) {
        return recoveryPlanService.createRecoveryPlan(injuryId, playerId, recoveryPlan);
    }

    @PutMapping("/updateRecoveryPlan/{recoveryPlanId}")
    public ResponseEntity<RecoveryPlan> updateRecoveryPlan(
            @PathVariable Long recoveryPlanId,
            @RequestBody RecoveryPlan newRecoveryPlan) {
        RecoveryPlan updatedRecoveryPlan = recoveryPlanService.updateRecoveryPlan(recoveryPlanId, newRecoveryPlan);
        return ResponseEntity.ok(updatedRecoveryPlan);
    }


    @DeleteMapping("deleteRecoveryPlan/{injuryId}/{playerId}/{recoveryPlanId}")
    public void deleteRecoveryPlan(@PathVariable Long injuryId, @PathVariable Long playerId, @PathVariable Long recoveryPlanId) {
        recoveryPlanService.deleteRecoveryPlan(injuryId, playerId, recoveryPlanId);
    }

    @GetMapping("/getRecoveryPlansByPlayerId/{playerId}")
    public ResponseEntity<List<RecoveryPlan>> getRecoveryPlansByPlayerId(@PathVariable Long playerId) {
        List<RecoveryPlan> recoveryPlans = recoveryPlanService.getRecoveryPlansByPlayerId(playerId);
        return ResponseEntity.ok(recoveryPlans);
    }

}
