package com.example.sport_backend.Repositories.matches;

import com.example.sport_backend.Entity.Matches.Goal;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface GoalRepo extends JpaRepository<Goal,Long> {

    @Query("SELECT COUNT(g) FROM Goal g " +
            "JOIN g.match m " +
            "JOIN m.teams t " +
            "JOIN t.players p " +
            "WHERE p.FirstName = :firstName " +
            "AND p.LastName = :lastName " +
            "AND t.name = :teamName " +
            "AND g.ScorerNumber = p.playerNumber")
    Long countGoalsByPlayerAndTeam(
            @Param("firstName") String firstName,
            @Param("lastName") String lastName,
            @Param("teamName") String teamName);
}
