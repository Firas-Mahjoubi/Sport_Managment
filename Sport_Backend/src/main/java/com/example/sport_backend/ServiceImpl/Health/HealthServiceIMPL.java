package com.example.sport_backend.ServiceImpl.Health;

import com.example.sport_backend.Entity.Health.HealthRecord;
import com.example.sport_backend.Repositories.Health.HealthRepositories;
import com.example.sport_backend.ServiceInterface.Health.IHealthService;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.List;

public class HealthServiceIMPL  implements IHealthService {



    private HealthRepositories healthRepositories;


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
    public HealthRecord createHealthRecord(HealthRecord healthRecord) {
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

        healthRepositories.deleteById(id);

    }

}
