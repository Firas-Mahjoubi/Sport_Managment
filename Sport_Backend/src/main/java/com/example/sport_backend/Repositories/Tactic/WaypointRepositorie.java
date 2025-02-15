package com.example.sport_backend.Repositories.Tactic;

import com.example.sport_backend.Entity.Tactic.Waypoint;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface WaypointRepositorie extends JpaRepository<Waypoint, Long> {
    List<Waypoint> findByPlayerMovementId(Long playerMovementId);

}
