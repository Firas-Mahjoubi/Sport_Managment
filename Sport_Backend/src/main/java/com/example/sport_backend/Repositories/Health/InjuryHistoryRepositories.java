package com.example.sport_backend.Repositories.Health;

import com.example.sport_backend.Entity.Health.InjuryHistory;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface InjuryHistoryRepositories extends JpaRepository<InjuryHistory, Long> {




    @Query("SELECT h FROM InjuryHistory h WHERE h.player.id = :playerId")
    List<InjuryHistory> findByPlayerId(@Param("playerId") Long playerId);


    @Query("SELECT ih FROM InjuryHistory ih ORDER BY ih.date DESC")
    List<InjuryHistory> findAllArchivedInjuries();

}
