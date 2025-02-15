package com.example.sport_backend.Repositories.ClubHouse;

import com.example.sport_backend.Entity.ClubHouse.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepositories extends JpaRepository<User, Long> {
}
