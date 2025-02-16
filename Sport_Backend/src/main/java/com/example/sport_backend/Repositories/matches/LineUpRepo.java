package com.example.sport_backend.Repositories.matches;

import com.example.sport_backend.Entity.Matchs.LineUp;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface LineUpRepo extends JpaRepository<LineUp,Long> {
}

