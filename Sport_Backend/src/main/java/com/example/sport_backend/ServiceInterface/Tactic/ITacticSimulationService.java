package com.example.sport_backend.ServiceInterface.Tactic;


import com.example.sport_backend.Entity.Tactic.TacticSimulation;

import java.util.List;

public interface ITacticSimulationService {
    TacticSimulation createSimulation(TacticSimulation simulation);
    List<TacticSimulation> getSimulationsByTactic(Long tacticId);
    void deleteSimulation(Long id);
}
