package com.example.sport_backend.Repositories.Tactic;

import com.example.sport_backend.Entity.Tactic.TacticSimulation;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface TacticSimulationRepositorie extends JpaRepository<TacticSimulation, Long> {
    List<TacticSimulation> findByTacticId(Long tacticId);

}
