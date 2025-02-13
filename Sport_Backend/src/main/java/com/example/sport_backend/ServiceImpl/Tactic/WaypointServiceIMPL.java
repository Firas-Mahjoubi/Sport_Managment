package com.example.sport_backend.ServiceImpl.Tactic;

import com.example.sport_backend.Entity.Tactic.Waypoint;
import com.example.sport_backend.Repositories.Tactic.WaypointRepositorie;
import com.example.sport_backend.ServiceInterface.Tactic.IWaypointService;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@AllArgsConstructor
@Slf4j
public class WaypointServiceIMPL implements IWaypointService {
    private final WaypointRepositorie waypointRepositorie;
    @Override
    public Waypoint addWaypoint(Waypoint waypoint) {
        return waypointRepositorie.save(waypoint);
    }

    @Override
    public List<Waypoint> getWaypointsByPlayerMovement(Long movementId) {
        return waypointRepositorie.findByPlayerMovementId(movementId);
    }

    @Override
    public void deleteWaypoint(Long id) {
        waypointRepositorie.deleteById(id);

    }
}
