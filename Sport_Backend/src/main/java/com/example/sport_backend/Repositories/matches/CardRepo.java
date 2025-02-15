package com.example.sport_backend.Repositories.matches;

import com.example.sport_backend.Entity.Matches.Card;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface CardRepo extends JpaRepository<Card,Long> {

    @Query("SELECT COUNT(c) FROM Card c " +
            "JOIN c.match m " +
            "JOIN m.teams t " +
            "JOIN t.players p " +
            "WHERE p.FirstName = :firstName " +
            "AND p.LastName = :lastName " +
            "AND t.name = :teamName " +
            "AND c.numberOfPlayer = p.playerNumber " +
            "AND c.cardType = 'YELLOW'")
    Long countYellowCardsByTeam(
            @Param("firstName") String firstName,
            @Param("lastName") String lastName,
            @Param("teamName") String teamName);
    @Query("SELECT COUNT(c) FROM Card c " +
            "JOIN c.match m " +
            "JOIN m.teams t " +
            "JOIN t.players p " +
            "WHERE p.FirstName = :firstName " +
            "AND p.LastName = :lastName " +
            "AND t.name = :teamName " +
            "AND c.numberOfPlayer = p.playerNumber " +
            "AND c.cardType = 'RED'")
    Long countRedCardsByTeam(
            @Param("firstName") String firstName,
            @Param("lastName") String lastName,
            @Param("teamName") String teamName);


}
