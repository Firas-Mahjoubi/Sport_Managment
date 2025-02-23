package com.example.sport_backend.Controllers.Matches;

import com.example.sport_backend.Entity.ClubHouse.League;
import com.example.sport_backend.Entity.Matchs.Match;
import com.example.sport_backend.Entity.Matchs.MatchResponseDto;
import com.example.sport_backend.Repositories.ClubHouse.LeagueRepo;
import com.example.sport_backend.ServiceImpl.Matches.matchService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;
import java.util.Map;

@RequiredArgsConstructor
@RestController
@CrossOrigin(origins = "*")
public class MatchController {
    private final LeagueRepo leagueRepository;
    private final com.example.sport_backend.ServiceImpl.Matches.matchService matchService;
    @GetMapping("/generate/{leagueName}")
    public List<Match> generateMatches(@PathVariable String leagueName) {

        League league = leagueRepository.findByName(leagueName);


        return matchService.generateSeasonMatches(league, LocalDate.now());
    }
    @GetMapping("/get-matches-by-game-week")
    public ResponseEntity<Map<String, List<MatchResponseDto>>> getMatchesByGameWeek(@RequestParam int gameWeek) {
        Map<String, List<MatchResponseDto>> matchesByLeague = matchService.getMatchesByGameWeek(gameWeek);
        return ResponseEntity.ok(matchesByLeague);
    }


}
