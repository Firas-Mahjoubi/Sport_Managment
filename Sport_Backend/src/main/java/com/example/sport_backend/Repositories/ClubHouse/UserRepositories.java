package com.example.sport_backend.Repositories.ClubHouse;

import com.example.sport_backend.Entity.ClubHouse.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface UserRepositories extends JpaRepository<User, Long> {
    Optional<User> findByEmail(String email);
    Optional<User> findByVerificationToken(String token);
    List<User> findByTeamIsNull();
}
