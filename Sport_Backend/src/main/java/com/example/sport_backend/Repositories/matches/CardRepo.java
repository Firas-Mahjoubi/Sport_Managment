package com.example.sport_backend.Repositories.matches;

import com.example.sport_backend.Entity.Matchs.Card;
import com.example.sport_backend.Entity.Matchs.CardType;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface CardRepo extends JpaRepository<Card,Long> {

    @Query("SELECT COUNT(c) FROM Card c " +
            "JOIN c.cardTaker p " +
            "JOIN p.team t " +
            "WHERE p.FirstName = :firstName " +
            "AND p.LastName = :lastName " +
            "AND t.name = :teamName " +
            "AND c.cardType = :cardType")
    Long countCardsByPlayerAndTeam(
            @Param("firstName") String firstName,
            @Param("lastName") String lastName,
            @Param("teamName") String teamName,
            @Param("cardType") CardType cardType);
}
