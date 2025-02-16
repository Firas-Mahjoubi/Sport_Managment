package com.example.sport_backend.Repositories.AdvancedPlanning;

import com.example.sport_backend.Entity.AdvancedPlanning.Ressources;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface RessourcesRepository extends CrudRepository<Ressources,Long> {
}
