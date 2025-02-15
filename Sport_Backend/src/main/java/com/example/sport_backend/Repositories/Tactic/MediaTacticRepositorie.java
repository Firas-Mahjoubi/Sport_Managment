package com.example.sport_backend.Repositories.Tactic;

import com.example.sport_backend.Entity.Tactic.MediaTactic;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface MediaTacticRepositorie extends JpaRepository<MediaTactic, Long> {
    List<MediaTactic> findByTacticId(Long tacticId);

}
