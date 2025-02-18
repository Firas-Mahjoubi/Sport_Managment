package com.example.sport_backend.Repositories.TrainingGround;

import com.example.sport_backend.Entity.TrainigGround.Tag;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
@Repository
public interface TagRepositories extends JpaRepository<Tag, Long> {

}
