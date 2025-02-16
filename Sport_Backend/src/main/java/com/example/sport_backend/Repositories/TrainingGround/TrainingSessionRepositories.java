package com.example.sport_backend.Repositories.TrainingGround;

import com.example.sport_backend.Entity.TrainigGround.TrainingSession;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TrainingSessionRepositories extends JpaRepository<TrainingSession, Long> {
}
