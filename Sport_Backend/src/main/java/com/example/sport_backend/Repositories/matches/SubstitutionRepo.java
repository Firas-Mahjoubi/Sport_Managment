package com.example.sport_backend.Repositories.matches;

import com.example.sport_backend.Entity.Matchs.Match;
import com.example.sport_backend.Entity.Matchs.Substitution;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface SubstitutionRepo extends JpaRepository<Substitution,Long> {
    List<Substitution> findByMatch(Match match);
}