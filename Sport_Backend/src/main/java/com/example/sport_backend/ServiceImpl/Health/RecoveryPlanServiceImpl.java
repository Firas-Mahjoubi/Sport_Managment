package com.example.sport_backend.ServiceImpl.Health;

import com.example.sport_backend.Entity.ClubHouse.Player;
import com.example.sport_backend.Entity.Health.Injury;
import com.example.sport_backend.Entity.Health.RecoveryPlan;

import com.example.sport_backend.Repositories.ClubHouse.PlayerRepo;
import com.example.sport_backend.Repositories.Health.InjuryRepositories;
 // Assuming this repository is defined
import com.example.sport_backend.Repositories.Health.RecoveryPlanRepositories;
import com.example.sport_backend.ServiceInterface.Health.IRecoveryPlanService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;

@RequiredArgsConstructor
@Service
public class RecoveryPlanServiceImpl implements IRecoveryPlanService {

    @Autowired
    private RecoveryPlanRepositories recoveryPlanRepositories;

    @Autowired
    private InjuryRepositories injuryRepositories;

    @Autowired
    private PlayerRepo playerRepositories;

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
    public RecoveryPlan createRecoveryPlan(Long injuryId, Long playerId, RecoveryPlan recoveryPlan) {
        Injury injury = injuryRepositories.findById(injuryId)
                .orElseThrow(() -> new RuntimeException("Blessure introuvable"));

        Player player = playerRepositories.findById(playerId)
                .orElseThrow(() -> new RuntimeException("Joueur introuvable"));

        // Associer la blessure et le joueur au plan de récupération
        recoveryPlan.setInjury(injury);
        recoveryPlan.setPlayer(player);  // Assurez-vous que player est bien lié

        // Sauvegarder le plan de récupération
        return recoveryPlanRepositories.save(recoveryPlan);
    }


    @Override
    public RecoveryPlan updateRecoveryPlan(Long recoveryPlanId, RecoveryPlan newRecoveryPlan) {
        // Trouver le plan de récupération existant par son ID
        RecoveryPlan recoveryPlan = recoveryPlanRepositories.findById(recoveryPlanId)
                .orElseThrow(() -> new RuntimeException("Plan de récupération avec ID " + recoveryPlanId + " non trouvé"));

        // Mettre à jour les attributs du plan de récupération
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

        // Sauvegarder et retourner le plan mis à jour
        return recoveryPlanRepositories.save(recoveryPlan);
    }


    @Transactional
    @Override
    public void deleteRecoveryPlan(Long injuryId, Long playerId, Long recoveryPlanId) {
        RecoveryPlan recoveryPlan = recoveryPlanRepositories.findById(recoveryPlanId)
                .orElseThrow(() -> new RuntimeException("Plan de récupération introuvable"));

        Injury injury = injuryRepositories.findById(injuryId)
                .orElseThrow(() -> new RuntimeException("Blessure introuvable"));

        Player player = playerRepositories.findById(playerId)
                .orElseThrow(() -> new RuntimeException("Joueur introuvable"));

        // Vérification des IDs et des associations
        System.out.println("Suppression du RecoveryPlan - injuryId: " + injuryId + ", playerId: " + playerId + ", recoveryPlanId: " + recoveryPlanId);

        // Vérifier que le plan correspond bien à la blessure et au joueur
        if (!recoveryPlan.getInjury().equals(injury) || !recoveryPlan.getInjury().getPlayer().equals(player)) {
            throw new RuntimeException("Le Plan de récupération ne correspond pas à cette blessure et joueur.");
        }

        recoveryPlanRepositories.delete(recoveryPlan);
    }


    @Override
    public List<RecoveryPlan> getRecoveryPlansByPlayerId(Long playerId) {
        // Récupérer toutes les blessures du joueur
        List<Injury> injuries = injuryRepositories.findByPlayerId(playerId);

        if (injuries.isEmpty()) {
            throw new RuntimeException("Aucune blessure trouvée pour le joueur avec ID " + playerId);
        }

        // Récupérer tous les RecoveryPlan associés aux blessures de ce joueur
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

}
