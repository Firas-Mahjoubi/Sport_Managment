package com.example.sport_backend.Repositories.Tactic;

import com.example.sport_backend.Entity.Tactic.Tactic;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface TacticRepositories extends JpaRepository<Tactic, Long> {
    List<Tactic> findByTeamId(Long teamId);
}
