package com.example.sport_backend.Controllers.ClubHouse;

import com.example.sport_backend.Entity.ClubHouse.Team;
import com.example.sport_backend.ServiceImpl.ClubHouse.TeamServiceIMPL;
import com.example.sport_backend.ServiceInterface.ClubHouse.ITeamService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
@RestController
@RequiredArgsConstructor
public class TeamController {
    @Autowired
private ITeamService iTeamService;

@GetMapping("/getallteams")
    public List<Team> getAllTeams() {
        return iTeamService.getAllTeams();
    }

    @GetMapping("/getteam/{id}")
    public Team getTeamById(@PathVariable Long id) {
        return iTeamService.getTeamById(id);
    }

    @PostMapping ("/addteam")
    public Team addTeam(@RequestBody Team team) {
        return iTeamService.addTeam(team);
    }

    @DeleteMapping("/delete/{id}")
    public void deleteTeam(@PathVariable Long id) {
        iTeamService.deleteTeam(id);
    }

    @PutMapping("/updateteams/{id}")
    public Team updateTeam(@PathVariable Long id, @RequestBody Team team) {
        return iTeamService.updateTeam(id, team);
    }
}
