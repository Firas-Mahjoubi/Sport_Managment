package com.example.sport_backend.Controllers.ClubHouse;

import com.example.sport_backend.Entity.ClubHouse.Club;
import com.example.sport_backend.Entity.ClubHouse.Team;
import com.example.sport_backend.Entity.ClubHouse.TeamRequest;
import com.example.sport_backend.Repositories.ClubHouse.ClubRepo;
import com.example.sport_backend.Repositories.ClubHouse.TeamRepositories;
import com.example.sport_backend.ServiceImpl.ClubHouse.TeamServiceIMPL;
import com.example.sport_backend.ServiceInterface.ClubHouse.ITeamService;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
@RestController
@RequiredArgsConstructor
@RequestMapping("teams")
@CrossOrigin("*")
public class TeamController {
    @Autowired
private ITeamService iTeamService;

    private final TeamRepositories teamRepo;
    private final ClubRepo clubRepo;

@GetMapping("/getallteams")
    public List<Team> getAllTeams() {
        return iTeamService.getAllTeams();
    }

    @GetMapping("/getteam/{id}")
    public Team getTeamById(@PathVariable Long id) {
        return iTeamService.getTeamById(id);
    }

    @PostMapping("/addteam")
    public ResponseEntity<Team> addTeam(@ModelAttribute TeamRequest teamRequest) {
        Club club = clubRepo.findById(teamRequest.getClubId())
                .orElseThrow(() -> new EntityNotFoundException("Club not found"));

        Team team = new Team();
        team.setName(teamRequest.getName());
        team.setCategories(teamRequest.getCategories());
        team.setClub(club);

        return ResponseEntity.ok(teamRepo.save(team));
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
