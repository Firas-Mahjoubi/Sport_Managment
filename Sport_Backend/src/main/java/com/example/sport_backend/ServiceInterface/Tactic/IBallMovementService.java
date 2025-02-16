package com.example.sport_backend.ServiceInterface.Tactic;

import com.example.sport_backend.Entity.Tactic.BallMovement;

import java.util.List;

public interface IBallMovementService {
    BallMovement addBallMovement(BallMovement movement);
    List<BallMovement> getBallMovementsByTactic(Long tacticId);
    void deleteBallMovement(Long id);
}
