package com.example.sport_backend.Controllers.ClubHouse;

import com.example.sport_backend.Entity.ClubHouse.League;
import com.example.sport_backend.ServiceImpl.ClubHouse.LeagueServiceIMPL;
import com.example.sport_backend.ServiceInterface.ClubHouse.ILeagueService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
public class LeagueController {
   @Autowired
    private ILeagueService iLeagueService;

    @GetMapping("/getallleague")
    public List<League> getAllLeagues() {
        return iLeagueService.getAllLeagues();
    }

    @GetMapping("/getleague/{id}")
    public League getLeagueById(@PathVariable Long id) {
        return iLeagueService.getLeagueById(id);
    }

    @PostMapping("/addleague")
    public League addLeague(@RequestBody League league) {
        return iLeagueService.addLeague(league);
    }
    @DeleteMapping("/deleteleague/{id}")
    public void deleteLeague(@PathVariable Long id) {
        iLeagueService.deleteLeague(id);
    }

    @PutMapping("/update/{id}")
    public League updateLeague(@PathVariable Long id, @RequestBody League league) {
        return iLeagueService.updateLeague(id, league);
    }
}
