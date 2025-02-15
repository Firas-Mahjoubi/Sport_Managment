package com.example.sport_backend.ServiceInterface.Tactic;


import com.example.sport_backend.Entity.Tactic.PlayerMovement;

import java.util.List;

public interface IPlayerMovementService {
    PlayerMovement addMovement(PlayerMovement movement);
    List<PlayerMovement> getMovementsByTactic(Long tacticId);
    void deleteMovement(Long id);
}
