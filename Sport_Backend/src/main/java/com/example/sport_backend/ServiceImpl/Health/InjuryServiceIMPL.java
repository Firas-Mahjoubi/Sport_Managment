package com.example.sport_backend.ServiceImpl.Health;

import com.example.sport_backend.Entity.ClubHouse.Player;
import com.example.sport_backend.Entity.Health.Injury;
import com.example.sport_backend.Entity.Health.InjuryHistory;
import com.example.sport_backend.Entity.Health.RecoveryPlan;
import com.example.sport_backend.Repositories.ClubHouse.PlayerRepo;
import com.example.sport_backend.Repositories.Health.InjuryHistoryRepositories;
import com.example.sport_backend.Repositories.Health.InjuryRepositories;
import com.example.sport_backend.Repositories.Health.RecoveryPlanRepositories;
import com.example.sport_backend.ServiceInterface.Health.IInjuryService;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import com.example.sport_backend.Entity.Enum.Status;


import java.util.List;

@Transactional
@RequiredArgsConstructor
@Service
public class InjuryServiceIMPL implements IInjuryService {

    @Autowired
    private final InjuryRepositories injuryRepositories;
    private final PlayerRepo playerRepositories;
    private final RecoveryPlanRepositories recoveryPlanRepositories;

    @Autowired
    private InjuryHistoryRepositories injuryHistoryRepositories;




    @Override
    public List<Injury> getAllInjuries() {
        return injuryRepositories.findAllInjuries();
    }

    @Override
    public Injury getInjuryById(Long id) {
        return injuryRepositories.findById(id)
                .orElseThrow(() -> new RuntimeException("Injury avec ID " + id + " non trouvé"));
    }

    @Override
    public Injury createInjury(Long playerId, Injury injury) {
        Player player = playerRepositories.findById(playerId)
                .orElseThrow(() -> new RuntimeException("Joueur introuvable"));

        // Vérifier que l'injury contient les informations essentielles
        if (injury.getType() == null || injury.getSeverity() == null || injury.getDate() == null) {
            throw new IllegalArgumentException("Type, sévérité et date sont obligatoires !");
        }

        // Associer le joueur à la blessure
        injury.setPlayer(player);

        // Vérifier si un RecoveryPlan est présent et l'associer correctement
        if (injury.getRecoveryPlan() != null) {
            injury.getRecoveryPlan().setInjury(injury);
        }

        return injuryRepositories.save(injury);
    }



    @Override
    public Injury updateInjury(Long id, Injury newInjury) {
        return injuryRepositories.findById(id)
                .map(injury -> {
                    injury.setDate(newInjury.getDate());
                    injury.setType(newInjury.getType());
                    injury.setSeverity(newInjury.getSeverity());
                    injury.setDescription(newInjury.getDescription());
                    injury.setStatus(newInjury.getStatus());
                    injury.setZoneAffectee(newInjury.getZoneAffectee());
                    injury.setCause(newInjury.getCause());

                    // Mise à jour sécurisée du RecoveryPlan (évite de perdre les données)
                    if (newInjury.getRecoveryPlan() != null) {
                        injury.setRecoveryPlan(newInjury.getRecoveryPlan());
                    }

                    // Mise à jour sécurisée du Player (évite les désaffectations accidentelles)
                    if (newInjury.getPlayer() != null) {
                        injury.setPlayer(newInjury.getPlayer());
                    }

                    return injuryRepositories.save(injury);
                })
                .orElseThrow(() -> new RuntimeException("Injury avec ID " + id + " non trouvé"));
    }





    @Override
    public List<Injury> getInjuriesByPlayer(Long playerId) {
        return injuryRepositories.findAllByPlayerId(playerId);
    }


    @Override
    @Transactional
    public void archiveAndRemoveInjury(Long injuryId) {
        Injury injury = injuryRepositories.findById(injuryId)
                .orElseThrow(() -> new EntityNotFoundException("Blessure introuvable"));

        System.out.println("Tentative de suppression de la blessure ID : " + injuryId);
        System.out.println("Statut actuel : " + injury.getStatus());

        // Vérification stricte : seule une blessure GUERIE peut être supprimée
        if (injury.getStatus() != Status.GUERIE) {
            System.out.println("ÉCHEC : La blessure n'est pas guérie !");
            throw new RuntimeException("Impossible de supprimer ! La blessure n'est pas encore guérie.");
        }

        // Archiver la blessure
        InjuryHistory history = new InjuryHistory(injury);
        injuryHistoryRepositories.save(history);
        System.out.println("Blessure archivée avec succès.");

        // Supprimer l'association avec le joueur
        if (injury.getPlayer() != null) {
            injury.setPlayer(null);
            injuryRepositories.save(injury);
        }

        // Supprimer la blessure
        injuryRepositories.delete(injury);
        System.out.println("Blessure supprimée avec succès !");
    }




    @Override
    public List<InjuryHistory> getInjuryHistoryByPlayer(Long playerId) {
        return injuryHistoryRepositories.findByPlayerId(playerId);
    }


    @Override
    public List<InjuryHistory> getAllArchivedInjuries() {
        return injuryHistoryRepositories.findAllArchivedInjuries();
    }




}







