package com.example.sport_backend.Repositories.TrainingGround;

import com.example.sport_backend.Entity.TrainigGround.MediaExercice;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface MediaRepositories extends JpaRepository<MediaExercice, Long> {
    List<MediaExercice> findByExerciceId(Long exerciceId);
}

