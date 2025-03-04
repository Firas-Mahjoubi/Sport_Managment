package com.example.sport_backend.Repositories.matches;

import com.example.sport_backend.Entity.Matchs.Match;
import com.example.sport_backend.Entity.Matchs.Substitution;
import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface SubstitutionRepo extends JpaRepository<Substitution,Long> {
    List<Substitution> findByMatch(Match match);
    @Modifying
    @Transactional
    @Query("DELETE FROM Substitution s WHERE s.lineUp.id = :lineupId")
    void deleteByLineUpId(@Param("lineupId") Long lineupId);
}