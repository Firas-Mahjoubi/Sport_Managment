package com.example.sport_backend.Repositories.Tactic;

import com.example.sport_backend.Entity.Tactic.BallMovement;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface BallMovementRepositorie extends JpaRepository<BallMovement, Long> {
    List<BallMovement> findByTacticId(Long tacticId);

}
