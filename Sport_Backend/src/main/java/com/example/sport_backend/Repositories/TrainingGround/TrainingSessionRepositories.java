package com.example.sport_backend.Repositories.TrainingGround;

import com.example.sport_backend.Entity.TrainigGround.TrainingSession;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.PageRequest;

import java.util.List;

public interface TrainingSessionRepositories extends JpaRepository<TrainingSession, Long> {

    //TrainingSession findById(Integer numSession);
    @Query("SELECT AVG(ts.attendingPlayers) FROM TrainingSession ts")
    Double getAverageAttendingPlayers();

    @Query("SELECT ts FROM TrainingSession ts WHERE ts.date >= CURRENT_DATE ORDER BY ts.date ASC")
    List<TrainingSession> findUpcomingSessions(Pageable pageable);

}
