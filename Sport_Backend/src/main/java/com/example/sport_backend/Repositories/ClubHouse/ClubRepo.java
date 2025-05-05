package com.example.sport_backend.Repositories.ClubHouse;

import com.example.sport_backend.Entity.ClubHouse.Club;
import com.example.sport_backend.Entity.ClubHouse.League;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface ClubRepo extends JpaRepository<Club,Long> {
    @Query("SELECT c FROM Club c WHERE LOWER(c.name) LIKE LOWER(CONCAT('%', :keyword, '%')) OR LOWER(c.location) LIKE LOWER(CONCAT('%', :keyword, '%'))")
    List<Club> searchClubsByKeyword(@Param("keyword") String keyword);





}
