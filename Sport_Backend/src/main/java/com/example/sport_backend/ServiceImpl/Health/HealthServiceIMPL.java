package com.example.sport_backend.ServiceImpl.Health;

import com.example.sport_backend.Entity.ClubHouse.Player;
import com.example.sport_backend.Entity.Health.HealthRecord;
import com.example.sport_backend.Repositories.ClubHouse.PlayerRepo;
import com.example.sport_backend.Repositories.Health.HealthRepositories;
import com.example.sport_backend.ServiceInterface.Health.IHealthService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@RequiredArgsConstructor
@Service
public class HealthServiceIMPL  implements IHealthService {




    @Autowired
    private HealthRepositories healthRepositories;

    @Autowired
    private PlayerRepo playerRepositories;



    @Override
    public List<HealthRecord> getAllHealthRecords() {
        return healthRepositories.findAll();
    }



    @Override
    public HealthRecord getHealthRecordById(Long id) {
        return healthRepositories.findById(id)
                .orElseThrow(() -> new RuntimeException("HealthRecord avec ID " + id + " non trouvé"));
    }




    @Override
    public HealthRecord createHealthRecord(HealthRecord healthRecord, Long playerId) {
        // Vérifier si le joueur existe
        Player player = playerRepositories.findById(playerId)
                .orElseThrow(() -> new RuntimeException("Joueur avec ID " + playerId + " non trouvé"));

        // Vérifier si le joueur a déjà un HealthRecord
        if (player.getHealthRecord() != null) {
            throw new RuntimeException("Ce joueur possède déjà un HealthRecord");
        }

        // Associer le joueur au HealthRecord
        healthRecord.setPlayer(player);
        player.setHealthRecord(healthRecord);

        // Sauvegarder le HealthRecord
        return healthRepositories.save(healthRecord);
    }






    @Override
    public HealthRecord updateHealthRecord(Long id, HealthRecord newHealthRecord) {
        HealthRecord healthRecord = getHealthRecordById(id);
        healthRecord.setDate(newHealthRecord.getDate());
        healthRecord.setFatigue(newHealthRecord.getFatigue());
        healthRecord.setEtatPhysique(newHealthRecord.getEtatPhysique());
        healthRecord.setDouleursMusculaires(newHealthRecord.getDouleursMusculaires());
        healthRecord.setIntensite(newHealthRecord.getIntensite());
        healthRecord.setStatusJoueur(newHealthRecord.getStatusJoueur());
        healthRecord.setCommentaire(newHealthRecord.getCommentaire());
        return healthRepositories.save(healthRecord);
    }

    @Override
    public void deleteHealthRecord(Long id) {
        HealthRecord healthRecord = healthRepositories.findById(id)
                .orElseThrow(() -> new RuntimeException("HealthRecord introuvable avec l'ID : " + id));

        // Vérifier si un joueur est lié à ce HealthRecord
        if (healthRecord.getPlayer() != null) {
            Player player = healthRecord.getPlayer();
            player.setHealthRecord(null); // Supprime la relation du côté du joueur
            playerRepositories.save(player); // Sauvegarde le joueur mis à jour
        }

        // Supprimer le HealthRecord
        healthRepositories.deleteById(id);
    }




}
