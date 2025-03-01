package com.example.sport_backend.ServiceInterface.Health;

import com.example.sport_backend.Entity.Health.Injury;
import com.example.sport_backend.Entity.Health.RecoveryPlan;
import java.util.List;

public interface IRecoveryPlanService {

    List<RecoveryPlan> getAllRecoveryPlans();

    RecoveryPlan getRecoveryPlanById(Long id);

   // RecoveryPlan createRecoveryPlan(Long injuryId, Long playerId, RecoveryPlan recoveryPlan);

    RecoveryPlan createRecoveryPlan(Long injuryId, RecoveryPlan recoveryPlan);


    //void deleteRecoveryPlan(Long injuryId, Long playerId, Long recoveryPlanId);
    void deleteRecoveryPlan(Long injuryId, Long recoveryPlanId);



    RecoveryPlan updateRecoveryPlan(Long recoveryPlanId, RecoveryPlan newRecoveryPlan);

    List<RecoveryPlan> getRecoveryPlansByPlayerId(Long playerId);

    List<Injury> getInjuriesByPlayerId(Long playerId);

}
