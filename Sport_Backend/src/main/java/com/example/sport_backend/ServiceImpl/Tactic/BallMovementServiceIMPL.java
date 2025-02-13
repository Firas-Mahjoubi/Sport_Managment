package com.example.sport_backend.ServiceImpl.Tactic;

import com.example.sport_backend.Entity.Tactic.BallMovement;
import com.example.sport_backend.Repositories.Tactic.BallMovementRepositorie;
import com.example.sport_backend.ServiceInterface.Tactic.IBallMovementService;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@AllArgsConstructor
@Slf4j
public class BallMovementServiceIMPL implements IBallMovementService {
    public BallMovementRepositorie ballMovementRepositorie;
    @Override
    public BallMovement addBallMovement(BallMovement movement) {
        return ballMovementRepositorie.save(movement);
    }

    @Override
    public List<BallMovement> getBallMovementsByTactic(Long tacticId) {
        return ballMovementRepositorie.findByTacticId(tacticId);
    }

    @Override
    public void deleteBallMovement(Long id) {
        ballMovementRepositorie.deleteById(id);

    }
}
