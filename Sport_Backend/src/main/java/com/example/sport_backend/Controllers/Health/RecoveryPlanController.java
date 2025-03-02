package com.example.sport_backend.Controllers.Health;

import com.example.sport_backend.Entity.Health.Injury;
import com.example.sport_backend.Entity.Health.RecoveryPlan;
import com.example.sport_backend.ServiceInterface.Health.IRecoveryPlanService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/recovery-plans")
@CrossOrigin(origins = "*") // Allow CORS for frontend access
public class RecoveryPlanController {

    @Autowired
    private IRecoveryPlanService recoveryPlanService;

    // ✅ GET ALL
    @GetMapping("/getAllRecoveryPlans")
    public List<RecoveryPlan> getAllRecoveryPlans() {
        return recoveryPlanService.getAllRecoveryPlans();
    }

    // ✅ GET BY ID
    @GetMapping("/getRecoveryPlanById/{id}")
    public RecoveryPlan getRecoveryPlanById(@PathVariable Long id) {
        return recoveryPlanService.getRecoveryPlanById(id);
    }

    @PostMapping("/createRecoveryPlan/{injuryId}")
    public ResponseEntity<?> createRecoveryPlan(
            @PathVariable Long injuryId,
            @Valid @RequestBody RecoveryPlan recoveryPlan) {

        RecoveryPlan createdPlan = recoveryPlanService.createRecoveryPlan(injuryId, recoveryPlan);
        return ResponseEntity.status(HttpStatus.CREATED).body(createdPlan);
    }



    // ✅ POST (Mettre à jour un Recovery Plan) 🔥 Respecte ta logique !
    @PostMapping("/updateRecoveryPlan/{recoveryPlanId}")
    public ResponseEntity<RecoveryPlan> updateRecoveryPlan(
            @PathVariable Long recoveryPlanId,
            @RequestBody RecoveryPlan newRecoveryPlan) {
        RecoveryPlan updatedRecoveryPlan = recoveryPlanService.updateRecoveryPlan(recoveryPlanId, newRecoveryPlan);
        return ResponseEntity.ok(updatedRecoveryPlan);
    }

    @DeleteMapping("/deleteRecoveryPlan/{injuryId}/{recoveryPlanId}")
    public ResponseEntity<?> deleteRecoveryPlan(
            @PathVariable Long injuryId,
            @PathVariable Long recoveryPlanId) {
        recoveryPlanService.deleteRecoveryPlan(injuryId, recoveryPlanId);
        return ResponseEntity.ok("Plan de récupération supprimé avec succès.");
    }




    // ✅ GET (Récupérer tous les plans d’un joueur)
    @GetMapping("/getRecoveryPlansByPlayerId/{playerId}")
    public ResponseEntity<List<RecoveryPlan>> getRecoveryPlansByPlayerId(@PathVariable Long playerId) {
        List<RecoveryPlan> recoveryPlans = recoveryPlanService.getRecoveryPlansByPlayerId(playerId);
        return ResponseEntity.ok(recoveryPlans);
    }

    @GetMapping("/getInjuriesByPlayerId/{playerId}")
    public ResponseEntity<List<Injury>> getInjuriesByPlayerId(@PathVariable Long playerId) {
        List<Injury> injuries = recoveryPlanService.getInjuriesByPlayerId(playerId);
        return ResponseEntity.ok(injuries);
    }

}
