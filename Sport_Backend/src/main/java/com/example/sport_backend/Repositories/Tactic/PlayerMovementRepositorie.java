package com.example.sport_backend.Repositories.Tactic;

import com.example.sport_backend.Entity.Tactic.PlayerMovement;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface PlayerMovementRepositorie extends JpaRepository<PlayerMovement, Long> {
    List<PlayerMovement> findByTacticId(Long tacticId);

}
