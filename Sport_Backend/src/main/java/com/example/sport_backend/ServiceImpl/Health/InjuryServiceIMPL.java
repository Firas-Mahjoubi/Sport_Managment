package com.example.sport_backend.ServiceImpl.Health;

import com.example.sport_backend.Entity.Health.Injury;
import com.example.sport_backend.Repositories.Health.InjuryRepositories;
import com.example.sport_backend.ServiceInterface.Health.IInjuryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;



@Service
public class InjuryServiceIMPL implements IInjuryService {

    @Autowired
    private InjuryRepositories injuryRepositories;

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
}
