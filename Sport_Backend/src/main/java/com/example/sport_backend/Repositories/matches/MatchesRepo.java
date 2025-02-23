package com.example.sport_backend.Repositories.matches;

import com.example.sport_backend.Entity.Matchs.Match;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface MatchesRepo extends JpaRepository<Match,Long> {
    List<Match> findByGameWeekAndSeason(int gameWeek, String season);


}
