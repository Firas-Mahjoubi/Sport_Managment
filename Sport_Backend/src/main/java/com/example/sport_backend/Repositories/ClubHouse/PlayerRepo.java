package com.example.sport_backend.Repositories.ClubHouse;

import com.example.sport_backend.Entity.ClubHouse.Player;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.Optional;

public interface PlayerRepo extends JpaRepository<Player,Long> {
    @Query("SELECT p FROM Player p " +
            "JOIN p.team t " +
            "JOIN t.matches m " +
            "WHERE m.id = :matchId " +
            "AND t.name = :teamName " +  // Filtering by team name
            "AND p.playerNumber = :playerNumber")
    Optional<Player> findPlayerByMatchAndTeamNameAndNumber(
            @Param("matchId") Long matchId,
            @Param("teamName") String teamName,  // Using team name instead of ID
            @Param("playerNumber") Integer playerNumber);

}
