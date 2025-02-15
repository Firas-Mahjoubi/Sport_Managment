package com.example.sport_backend.Repositories.ClubHouse;

import com.example.sport_backend.Entity.ClubHouse.Team;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface TeamRepositories  extends JpaRepository<Team, Long> {
    List<Team> findByTacticsId(long id);
}
