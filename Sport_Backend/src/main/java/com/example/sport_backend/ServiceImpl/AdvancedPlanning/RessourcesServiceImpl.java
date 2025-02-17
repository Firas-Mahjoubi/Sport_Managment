package com.example.sport_backend.ServiceImpl.AdvancedPlanning;


import com.example.sport_backend.Entity.AdvancedPlanning.Event;
import com.example.sport_backend.Entity.AdvancedPlanning.Ressources;
import com.example.sport_backend.Repositories.AdvancedPlanning.RessourcesRepository;
import com.example.sport_backend.ServiceInterface.AdvancedPlanning.RessourcesInterface;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@AllArgsConstructor
@Service
public class RessourcesServiceImpl implements RessourcesInterface {

    RessourcesRepository ressourcesRepository;
    @Override
    public Ressources addRessources(Ressources ressources) {
        return ressourcesRepository.save(ressources);
    }

    @Override
    public List<Ressources> getAllRessources() {
        return (List<Ressources>) ressourcesRepository.findAll();
    }

    @Override
    public Ressources updateRessources(Ressources ressources) {
        return ressourcesRepository.save(ressources);
    }

    @Override
    public Ressources getRessources(Long idRessources) {
        return (Ressources) ressourcesRepository.findById(idRessources).orElse(null);
    }

    @Override
    public void removeRessources(long idRessources) {ressourcesRepository.deleteById(idRessources);}
}
