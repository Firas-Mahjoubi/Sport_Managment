package com.example.sport_backend.Controllers.ClubHouse;

import com.example.sport_backend.Entity.ClubHouse.League;
import com.example.sport_backend.ServiceImpl.ClubHouse.LeagueServiceIMPL;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
public class LeagueController {
    private LeagueServiceIMPL leagueServiceIMPL;

    @GetMapping("/getallleague")
    public List<League> getAllLeagues() {
        return leagueServiceIMPL.getAllLeagues();
    }

    @GetMapping("/getleague/{id}")
    public League getLeagueById(@PathVariable Long id) {
        return leagueServiceIMPL.getLeagueById(id);
    }

    @PostMapping("/addleague")
    public League addLeague(@RequestBody League league) {
        return leagueServiceIMPL.addLeague(league);
    }
    @DeleteMapping("/deleteleague/{id}")
    public void deleteLeague(@PathVariable Long id) {
        leagueServiceIMPL.deleteLeague(id);
    }

    @PutMapping("/update/{id}")
    public League updateLeague(@PathVariable Long id, @RequestBody League league) {
        return leagueServiceIMPL.updateLeague(id, league);
    }
}
