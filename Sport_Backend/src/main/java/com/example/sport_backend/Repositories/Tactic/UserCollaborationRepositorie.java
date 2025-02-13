package com.example.sport_backend.Repositories.Tactic;

import com.example.sport_backend.Entity.Tactic.UserCollaboration;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface UserCollaborationRepositorie extends JpaRepository<UserCollaboration, Long> {
    List<UserCollaboration> findByTacticId(Long tacticId);

}
