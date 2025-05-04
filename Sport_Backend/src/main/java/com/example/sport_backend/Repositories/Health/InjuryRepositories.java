package com.example.sport_backend.Repositories.Health;

import com.example.sport_backend.Entity.Health.Injury;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface InjuryRepositories extends JpaRepository<Injury, Long> {

    @Query("SELECT i FROM Injury i JOIN i.player p WHERE p.id = :playerId")
    List<Injury> findAllByPlayerId(@Param("playerId") Long playerId);



    @Query("SELECT i FROM Injury i")
    List<Injury> findAllInjuries();



    // Récupérer toutes les blessures actives
    List<Injury> findByStatus(String status);

    // Récupérer toutes les blessures d'un joueur spécifique
    List<Injury> findByPlayerId(Long playerId);


    Optional<Injury> findByIdAndPlayerId(Long injuryId, Long playerId);






}
