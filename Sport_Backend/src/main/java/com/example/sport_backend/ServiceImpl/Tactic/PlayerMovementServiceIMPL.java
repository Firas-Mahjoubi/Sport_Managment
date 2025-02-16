package com.example.sport_backend.ServiceImpl.Tactic;

import com.example.sport_backend.Entity.Tactic.PlayerMovement;
import com.example.sport_backend.Repositories.Tactic.PlayerMovementRepositorie;
import com.example.sport_backend.ServiceInterface.Tactic.IPlayerMovementService;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@AllArgsConstructor
@Slf4j
public class PlayerMovementServiceIMPL implements IPlayerMovementService {
    private PlayerMovementRepositorie playerMovementRepositorie;
    @Override
    public PlayerMovement addMovement(PlayerMovement movement) {
        return playerMovementRepositorie.save(movement);
    }



    @Override
    public List<PlayerMovement> getMovementsByTactic(Long tacticId) {
        return playerMovementRepositorie.findByTacticId(tacticId);
    }

    @Override
    public void deleteMovement(Long id) {
        playerMovementRepositorie.deleteById(id);

    }
}
