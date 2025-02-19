package com.example.sport_backend.Repositories.TrainingGround;


import com.example.sport_backend.Entity.TrainigGround.Exercice;
import com.example.sport_backend.Entity.TrainigGround.Tag;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ExerciceRepositories extends JpaRepository<Exercice, Long> {

    List<Exercice> findByTags_Name(String tagName); // Fetch exercises by tag name

}
