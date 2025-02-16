package com.example.sport_backend.Repositories.AdvancedPlanning;

import com.example.sport_backend.Entity.AdvancedPlanning.Event;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface EventRepository extends CrudRepository<Event,Long> {
}
