package com.example.sport_backend.ServiceInterface.Health;

import com.example.sport_backend.Entity.Health.RecoveryPlan;

import java.util.List;

public interface IRecoveryPlanService {

    List<RecoveryPlan> getAllRecoveryPlans();

    RecoveryPlan getRecoveryPlanById(Long id);

    RecoveryPlan createRecoveryPlan(Long injuryId, Long playerId, RecoveryPlan recoveryPlan);

    // RecoveryPlan updateRecoveryPlan(Long injuryId, Long playerId, Long recoveryPlanId, RecoveryPlan recoveryPlan);

    void deleteRecoveryPlan(Long injuryId, Long playerId, Long recoveryPlanId);

    public RecoveryPlan updateRecoveryPlan(Long recoveryPlanId, RecoveryPlan newRecoveryPlan);

    public List<RecoveryPlan> getRecoveryPlansByPlayerId(Long playerId);
}
