package com.example.sport_backend.ServiceInterface.AdvancedPlanning;

import com.example.sport_backend.Entity.AdvancedPlanning.Event;
import com.example.sport_backend.Entity.AdvancedPlanning.Ressources;

import java.util.List;

public interface RessourcesInterface {
    Ressources addRessources (Ressources ressources);
    List<Ressources> getAllRessources();
    Ressources updateRessources (Ressources ressources);
    Ressources getRessources (Long idRessources);
    void removeRessources (long idRessources);

}
