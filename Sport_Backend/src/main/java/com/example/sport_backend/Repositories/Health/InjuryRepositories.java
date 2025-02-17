package com.example.sport_backend.Repositories.Health;

import com.example.sport_backend.Entity.Health.Injury;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface InjuryRepositories extends JpaRepository<Injury, Long> {


    // Récupérer toutes les blessures actives
    List<Injury> findByStatus(String status);

    // Récupérer toutes les blessures d'un joueur spécifique
    List<Injury> findByPlayerId(Long playerId);
}
