package com.example.sport_backend.Controllers.Health;


import com.example.sport_backend.Entity.Health.RecoveryPlan;
import com.example.sport_backend.ServiceInterface.Health.IRecoveryPlanService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/recovery-plans")
//@CrossOrigin(origins = "http://localhost:4200") // Autoriser Angular (si nécessaire)
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



    @PostMapping("createRecoveryPlan")
    public RecoveryPlan createRecoveryPlan(@RequestBody RecoveryPlan recoveryPlan) {
        return recoveryPlanService.createRecoveryPlan(recoveryPlan);
    }


    @PutMapping("updateRecoveryPlan/{id}")
    public RecoveryPlan updateRecoveryPlan(@PathVariable Long id, @RequestBody RecoveryPlan recoveryPlan) {
        return recoveryPlanService.updateRecoveryPlan(id, recoveryPlan);
    }


    @DeleteMapping("deleteRecoveryPlan/{id}")
    public void deleteRecoveryPlan(@PathVariable Long id) {
        recoveryPlanService.deleteRecoveryPlan(id);
    }
}

