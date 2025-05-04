package com.example.sport_backend.Repositories.Health;

import com.example.sport_backend.Entity.Health.HealthRecord;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface HealthRepositories extends JpaRepository<HealthRecord, Long> {

    @Query("SELECT hr FROM HealthRecord hr WHERE hr.player.id = :playerId")
    HealthRecord findByPlayerId(@Param("playerId") Long playerId);

}
