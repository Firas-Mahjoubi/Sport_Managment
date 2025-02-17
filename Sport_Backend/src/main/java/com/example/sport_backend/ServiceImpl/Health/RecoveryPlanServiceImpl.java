package com.example.sport_backend.ServiceImpl.Health;

import com.example.sport_backend.Entity.Health.RecoveryPlan;
import com.example.sport_backend.Repositories.Health.RecoveryPlanRepositories;
import com.example.sport_backend.ServiceInterface.Health.IRecoveryPlanService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;


@Service
public class RecoveryPlanServiceImpl  implements IRecoveryPlanService {


    @Autowired
    private RecoveryPlanRepositories recoveryPlanRepositories;


    @Override
    public List<RecoveryPlan> getAllRecoveryPlans() {
        return recoveryPlanRepositories.findAll();
    }

    @Override
    public RecoveryPlan getRecoveryPlanById(Long id) {
        return recoveryPlanRepositories.findById(id)
                .orElseThrow(() -> new RuntimeException("RecoveryPlan avec ID " + id + " non trouvé"));
    }

    @Override
    public RecoveryPlan createRecoveryPlan(RecoveryPlan recoveryPlan) {
        return recoveryPlanRepositories.save(recoveryPlan);
    }

    @Override
    public RecoveryPlan updateRecoveryPlan(Long id, RecoveryPlan newRecoveryPlan) {
        RecoveryPlan recoveryPlan = getRecoveryPlanById(id);
        recoveryPlan.setPlanDescription(newRecoveryPlan.getPlanDescription());
        recoveryPlan.setStartDate(newRecoveryPlan.getStartDate());
        recoveryPlan.setEstimatedEndDate(newRecoveryPlan.getEstimatedEndDate());
        recoveryPlan.setActualEndDate(newRecoveryPlan.getActualEndDate());
        recoveryPlan.setProgress(newRecoveryPlan.getProgress());
        recoveryPlan.setSessionFrequency(newRecoveryPlan.getSessionFrequency());
        recoveryPlan.setSessionDuration(newRecoveryPlan.getSessionDuration());
        recoveryPlan.setPlanType(newRecoveryPlan.getPlanType());
        recoveryPlan.setNextReviewDate(newRecoveryPlan.getNextReviewDate());
        recoveryPlan.setAdjustments(newRecoveryPlan.getAdjustments());
        recoveryPlan.setPlanStatus(newRecoveryPlan.getPlanStatus());
        return recoveryPlanRepositories.save(recoveryPlan);
    }

    @Override
    public void deleteRecoveryPlan(Long id) {
        recoveryPlanRepositories.deleteById(id);
    }
}
