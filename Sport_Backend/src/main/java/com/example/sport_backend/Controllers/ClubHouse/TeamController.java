package com.example.sport_backend.Controllers.ClubHouse;

import com.example.sport_backend.Entity.ClubHouse.Team;
import com.example.sport_backend.ServiceImpl.ClubHouse.TeamServiceIMPL;
import org.springframework.web.bind.annotation.*;

import java.util.List;

public class TeamController {
private TeamServiceIMPL teamServiceIMPL;

@GetMapping("/getallteams")
    public List<Team> getAllTeams() {
        return teamServiceIMPL.getAllTeams();
    }

    @GetMapping("/getteam/{id}")
    public Team getTeamById(@PathVariable Long id) {
        return teamServiceIMPL.getTeamById(id);
    }

    @PostMapping ("/addteam")
    public Team addTeam(@RequestBody Team team) {
        return teamServiceIMPL.addTeam(team);
    }

    @DeleteMapping("/delete/{id}")
    public void deleteTeam(@PathVariable Long id) {
        teamServiceIMPL.deleteTeam(id);
    }

    @PutMapping("/updateteams/{id}")
    public Team updateTeam(@PathVariable Long id, @RequestBody Team team) {
        return teamServiceIMPL.updateTeam(id, team);
    }
}
