package com.example.sport_backend.ServiceImpl.Health;

import com.example.sport_backend.Entity.ClubHouse.Player;
import com.example.sport_backend.Entity.Health.Injury;
import com.example.sport_backend.Entity.Health.RecoveryPlan;
import com.example.sport_backend.Repositories.ClubHouse.PlayerRepo;
import com.example.sport_backend.Repositories.Health.InjuryRepositories;
import com.example.sport_backend.Repositories.Health.RecoveryPlanRepositories;
import com.example.sport_backend.ServiceInterface.Health.IRecoveryPlanService;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.util.ArrayList;
import java.util.List;

@RequiredArgsConstructor
@Service
@Transactional
public class RecoveryPlanServiceImpl implements IRecoveryPlanService {

    private final RecoveryPlanRepositories recoveryPlanRepositories;
    private final InjuryRepositories injuryRepositories;
    private final PlayerRepo playerRepositories;

    @Override
    public List<RecoveryPlan> getAllRecoveryPlans() {
        List<RecoveryPlan> recoveryPlans = recoveryPlanRepositories.findAll();

        if (recoveryPlans.isEmpty()) {
            throw new RuntimeException("Aucun plan de récupération trouvé !");
        }

        return recoveryPlans;
    }

    @Override
    public RecoveryPlan getRecoveryPlanById(Long id) {
        return recoveryPlanRepositories.findById(id)
                .orElseThrow(() -> new RuntimeException("RecoveryPlan avec ID " + id + " non trouvé"));
    }

    @Override
    public RecoveryPlan createRecoveryPlan(Long injuryId, RecoveryPlan recoveryPlan) {
        Injury injury = injuryRepositories.findById(injuryId)
                .orElseThrow(() -> new EntityNotFoundException("Injury not found with id: " + injuryId));

        if (injury.getRecoveryPlan() != null) {
            throw new IllegalStateException("Cette blessure a déjà un plan de récupération.");
        }

        recoveryPlan.setInjury(injury);
        recoveryPlan.setId(null);
        return recoveryPlanRepositories.save(recoveryPlan);
    }




    @Override
    public RecoveryPlan updateRecoveryPlan(Long recoveryPlanId, RecoveryPlan newRecoveryPlan) {
        RecoveryPlan recoveryPlan = recoveryPlanRepositories.findById(recoveryPlanId)
                .orElseThrow(() -> new RuntimeException("Plan de récupération avec ID " + recoveryPlanId + " non trouvé"));

        // Mettre à jour les attributs
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

    @Transactional
    @Override
    public void deleteRecoveryPlan(Long injuryId, Long recoveryPlanId) {
        RecoveryPlan recoveryPlan = recoveryPlanRepositories.findById(recoveryPlanId)
                .orElseThrow(() -> new RuntimeException("Plan de récupération introuvable"));

        Injury injury = injuryRepositories.findById(injuryId)
                .orElseThrow(() -> new RuntimeException("Blessure introuvable"));

        if (!recoveryPlan.getInjury().equals(injury)) {
            throw new RuntimeException("Le Plan de récupération ne correspond pas à cette blessure.");
        }

        recoveryPlanRepositories.delete(recoveryPlan);
    }


    @Override
    public List<RecoveryPlan> getRecoveryPlansByPlayerId(Long playerId) {
        List<Injury> injuries = injuryRepositories.findByPlayerId(playerId);

        if (injuries.isEmpty()) {
            throw new RuntimeException("Aucune blessure trouvée pour le joueur avec ID " + playerId);
        }

        List<RecoveryPlan> recoveryPlans = new ArrayList<>();

        for (Injury injury : injuries) {
            if (injury.getRecoveryPlan() != null) {
                recoveryPlans.add(injury.getRecoveryPlan());
            }
        }

        if (recoveryPlans.isEmpty()) {
            throw new RuntimeException("Aucun plan de récupération trouvé pour ce joueur");
        }

        return recoveryPlans;
    }

    @Override
    public List<Injury> getInjuriesByPlayerId(Long playerId) {
        Player player = playerRepositories.findById(playerId)
                .orElseThrow(() -> new RuntimeException("Joueur introuvable"));

        List<Injury> injuries = injuryRepositories.findByPlayerId(playerId);

        if (injuries.isEmpty()) {
            throw new RuntimeException("Aucune blessure trouvée pour ce joueur !");
        }

        return injuries;
    }





}
