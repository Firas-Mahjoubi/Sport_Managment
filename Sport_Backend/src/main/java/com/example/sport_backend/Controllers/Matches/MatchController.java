package com.example.sport_backend.Controllers.Matches;

import com.example.sport_backend.Entity.ClubHouse.League;
import com.example.sport_backend.Entity.Matches.Goal;
import com.example.sport_backend.Entity.Matches.Match;
import com.example.sport_backend.Repositories.ClubHouse.LeagueRepo;
import com.example.sport_backend.ServiceImpl.Matches.matchService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;

@RequiredArgsConstructor
@RestController
public class MatchController {
    private final LeagueRepo leagueRepository;
    private final matchService matchService;
    @GetMapping("/generate/{leagueName}")
    public List<Match> generateMatches(@PathVariable String leagueName) {

        League league = leagueRepository.findByName(leagueName);


        return matchService.generateSeasonMatches(league, LocalDate.now());
    }

}
