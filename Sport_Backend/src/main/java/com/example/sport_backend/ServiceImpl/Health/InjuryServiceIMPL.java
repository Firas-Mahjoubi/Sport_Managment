package com.example.sport_backend.ServiceImpl.Health;

import com.example.sport_backend.Entity.ClubHouse.Player;
import com.example.sport_backend.Entity.Health.Injury;
import com.example.sport_backend.Repositories.ClubHouse.PlayerRepo;
import com.example.sport_backend.Repositories.Health.InjuryRepositories;
import com.example.sport_backend.ServiceInterface.Health.IInjuryService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Transactional
@RequiredArgsConstructor
@Service
public class InjuryServiceIMPL implements IInjuryService {

    @Autowired
    private InjuryRepositories injuryRepositories;
    private final PlayerRepo playerRepositories;




    @Override
    public List<Injury> getAllInjuries() {
        return injuryRepositories.findAll();
    }

    @Override
    public Injury getInjuryById(Long id) {
        return injuryRepositories.findById(id)
                .orElseThrow(() -> new RuntimeException("Injury avec ID " + id + " non trouvé"));
    }

    @Override
    public Injury createInjury(Injury injury) {
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
                    injury.setRecoveryPlan(newInjury.getRecoveryPlan());
                    injury.setPlayer(newInjury.getPlayer());
                    return injuryRepositories.save(injury);
                })
                .orElseThrow(() -> new RuntimeException("Injury avec ID " + id + " non trouvé"));
    }

    @Override
    public void deleteInjury(Long id) {

        injuryRepositories.deleteById(id);

    }

//Affecter un Plan de Récupération (RecoveryPlan) à une Blessure
    public Injury assignInjuryToHealthRecord(Long playerId, Injury injury) {
        Player player = playerRepositories.findById(playerId)
                .orElseThrow(() -> new RuntimeException("Joueur introuvable"));

        if (player.getHealthRecord() == null) {
            throw new RuntimeException("Le joueur n'a pas de dossier médical associé.");
        }

        injury.setPlayer(player);
        return injuryRepositories.save(injury);
    }

    //Désaffecter une Blessure (Injury) d'un Joueur
    @Transactional
    public void unassignInjuryFromPlayer(Long injuryId) {
        Injury injury = injuryRepositories.findById(injuryId)
                .orElseThrow(() -> new RuntimeException("Blessure introuvable"));

        // Si la blessure est associée à un joueur, on dissocie le joueur
        if (injury.getPlayer() != null) {
            injury.setPlayer(null);  // Met player_id à NULL
            injuryRepositories.save(injury);  // Sauvegarde des modifications
        }
    }

}







