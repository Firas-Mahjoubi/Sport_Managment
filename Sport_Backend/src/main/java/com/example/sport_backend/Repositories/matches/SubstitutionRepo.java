package com.example.sport_backend.Repositories.matches;

import com.example.sport_backend.Entity.Matchs.Substitution;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface SubstitutionRepo extends JpaRepository<Substitution,Long> {
}