package com.example.sport_backend.Repositories.TrainingGround;


import com.example.sport_backend.Entity.TrainigGround.Exercice;
import com.example.sport_backend.Entity.TrainigGround.Tag;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.PageRequest;


import java.util.List;

public interface ExerciceRepositories extends JpaRepository<Exercice, Long> {

    List<Exercice> findByTags_Name(String tagName); // Fetch exercises by tag name
    @Query("SELECT e.name, COUNT(ts) as usageCount FROM Exercice e JOIN e.trainingSessions ts GROUP BY e.name ORDER BY usageCount DESC")
    List<Object[]> getTopUsedExercises(Pageable pageable);
}
