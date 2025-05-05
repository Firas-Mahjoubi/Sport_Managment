package com.example.sport_backend.Repositories.ClubHouse;

import com.example.sport_backend.payload.TeamAlertDTO;
import com.example.sport_backend.payload.TeamPlayerCountDTO;
import com.example.sport_backend.Entity.ClubHouse.Player;
import com.example.sport_backend.Entity.ClubHouse.Team;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface PlayerRepo extends JpaRepository<Player,Long> {
    List<Player> findByTeamAndPlayerNumberIn(Team team, List<Long> numbers);
    Optional<Player> findByTeamAndPlayerNumber(Team team, Integer playerNumber);


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


    // ✅ Sélectionner les joueurs qui ne sont pas dans la table HealthRecord
    @Query("SELECT p FROM Player p WHERE p.id NOT IN (SELECT h.player.id FROM HealthRecord h WHERE h.player IS NOT NULL)")
    List<Player> findPlayersWithoutHealthRecord();

    @Query("SELECT new com.example.sport_backend.payload.TeamPlayerCountDTO(t.categories, c.name, COUNT(p)) " +
            "FROM Player p RIGHT JOIN p.team t JOIN t.club c " +
            "GROUP BY t.categories, c.name")

    List<TeamPlayerCountDTO> countPlayersPerTeam();

    @Query("SELECT new com.example.sport_backend.payload.TeamAlertDTO(" +
            "t.categories, c.name, COUNT(p), " +
            "CASE WHEN COUNT(p) = 0 THEN 'Aucun joueur' " +
            "WHEN COUNT(p) < 11 THEN 'Effectif incomplet' ELSE '' END) " +
            "FROM Player p RIGHT JOIN p.team t JOIN t.club c " +
            "GROUP BY t.categories, c.name " +
            "HAVING COUNT(p) < 11")
    List<TeamAlertDTO> getTeamsWithIncompleteRoster();


}
