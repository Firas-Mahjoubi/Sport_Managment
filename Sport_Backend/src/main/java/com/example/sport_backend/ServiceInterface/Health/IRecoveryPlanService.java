package com.example.sport_backend.ServiceInterface.Health;

import com.example.sport_backend.Entity.Health.RecoveryPlan;

import java.util.List;

public interface IRecoveryPlanService {


    List<RecoveryPlan> getAllRecoveryPlans();
    RecoveryPlan getRecoveryPlanById(Long id);
    RecoveryPlan createRecoveryPlan(RecoveryPlan recoveryPlan);
    RecoveryPlan updateRecoveryPlan(Long id, RecoveryPlan recoveryPlan);
    void deleteRecoveryPlan(Long id);
}


