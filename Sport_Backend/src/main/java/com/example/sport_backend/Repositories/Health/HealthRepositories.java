package com.example.sport_backend.Repositories.Health;

import com.example.sport_backend.Entity.Health.HealthRecord;
import org.springframework.data.jpa.repository.JpaRepository;

public interface HealthRepositories extends JpaRepository<HealthRecord, Long> {
}
