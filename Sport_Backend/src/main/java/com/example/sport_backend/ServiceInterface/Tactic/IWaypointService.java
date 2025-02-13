package com.example.sport_backend.ServiceInterface.Tactic;


import com.example.sport_backend.Entity.Tactic.Waypoint;

import java.util.List;

public interface IWaypointService {
    Waypoint addWaypoint(Waypoint waypoint);
    List<Waypoint> getWaypointsByPlayerMovement(Long movementId);
    void deleteWaypoint(Long id);
}
