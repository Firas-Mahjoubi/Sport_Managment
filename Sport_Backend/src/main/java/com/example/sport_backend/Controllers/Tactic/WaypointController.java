package com.example.sport_backend.Controllers.Tactic;

import com.example.sport_backend.Entity.Tactic.Waypoint;
import com.example.sport_backend.ServiceInterface.Tactic.IWaypointService;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@AllArgsConstructor
@RequestMapping("/api/waypoints")
@CrossOrigin(origins = "*")
public class WaypointController{
    @PostMapping("add")
    public Waypoint addWaypoint(@RequestBody Waypoint waypoint) {
        return waypointService.addWaypoint(waypoint);
    }
    @GetMapping("movement/{movementId}")
    public List<Waypoint> getWaypointsByPlayerMovement(@PathVariable Long movementId) {
        return waypointService.getWaypointsByPlayerMovement(movementId);
    }
    @DeleteMapping("delete/{id}")
    public void deleteWaypoint(@PathVariable Long id) {
        waypointService.deleteWaypoint(id);
    }

    private final IWaypointService waypointService;
}
