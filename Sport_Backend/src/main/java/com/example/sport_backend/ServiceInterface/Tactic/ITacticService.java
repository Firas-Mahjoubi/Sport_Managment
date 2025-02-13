package com.example.sport_backend.ServiceInterface.Tactic;

import com.example.sport_backend.Entity.Tactic.Tactic;

import java.util.List;

public interface ITacticService {
    Tactic createTactic(Tactic tactic);
    Tactic updateTactic(Long id, Tactic updatedTactic);
    void deleteTactic(Long id);
    List<Tactic> getAllTactics();
    List<Tactic> getTacticsByTeam(Long teamId);
}
