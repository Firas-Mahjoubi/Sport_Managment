package com.example.sport_backend.ServiceImpl.Health;

import com.example.sport_backend.Entity.Health.Injury;
import com.example.sport_backend.Entity.Health.RecoveryPlan;
import com.example.sport_backend.Repositories.Health.InjuryRepositories;
import com.example.sport_backend.Repositories.Health.RecoveryPlanRepositories;
import com.example.sport_backend.ServiceInterface.Health.IRecoveryPlanService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@RequiredArgsConstructor
@Service
public class RecoveryPlanServiceImpl  implements IRecoveryPlanService {


    @Autowired
    private RecoveryPlanRepositories recoveryPlanRepositories;
    private final InjuryRepositories injuryRepositories;


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


//Affecter une Blessure (Injury) à un Dossier Médical (HealthRecord)
    public RecoveryPlan assignRecoveryPlanToInjury(Long injuryId, RecoveryPlan recoveryPlan) {
        Injury injury = injuryRepositories.findById(injuryId)
                .orElseThrow(() -> new RuntimeException("Blessure introuvable"));

        recoveryPlan.setInjury(injury);
        injury.setRecoveryPlan(recoveryPlan); // Ajoute cette ligne !

        return recoveryPlanRepositories.save(recoveryPlan);
    }


    //Désaffecter un Plan de Récupération (RecoveryPlan) d'une Blessure
    public void unassignRecoveryPlanFromInjury(Long recoveryPlanId) {
        RecoveryPlan recoveryPlan = recoveryPlanRepositories.findById(recoveryPlanId)
                .orElseThrow(() -> new RuntimeException("Plan de récupération introuvable"));

        recoveryPlan.setInjury(null);
        recoveryPlanRepositories.save(recoveryPlan);
    }




}
