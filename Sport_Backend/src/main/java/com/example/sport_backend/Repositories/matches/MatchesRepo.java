package com.example.sport_backend.Repositories.matches;

import com.example.sport_backend.Entity.Matchs.Match;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface MatchesRepo extends JpaRepository<Match,Long> {
}
