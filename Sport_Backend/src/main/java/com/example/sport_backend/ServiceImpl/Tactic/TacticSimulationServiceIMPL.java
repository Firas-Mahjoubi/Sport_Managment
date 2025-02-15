package com.example.sport_backend.ServiceImpl.Tactic;

import com.example.sport_backend.Entity.Tactic.TacticSimulation;
import com.example.sport_backend.Repositories.Tactic.TacticSimulationRepositorie;
import com.example.sport_backend.ServiceInterface.Tactic.ITacticSimulationService;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@AllArgsConstructor
@Slf4j
public class TacticSimulationServiceIMPL implements ITacticSimulationService {
    private final TacticSimulationRepositorie tacticSimulationRepositorie;


    @Override
    public TacticSimulation createSimulation(TacticSimulation simulation) {
        return tacticSimulationRepositorie.save(simulation);
    }

    @Override
    public List<TacticSimulation> getSimulationsByTactic(Long tacticId) {
        return tacticSimulationRepositorie.findByTacticId(tacticId);
    }

    @Override
    public void deleteSimulation(Long id) {
        tacticSimulationRepositorie.deleteById(id);

    }
}
