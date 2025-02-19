package com.example.sport_backend.ServiceImpl.Tactic;

import com.example.sport_backend.Entity.Tactic.UserCollaboration;
import com.example.sport_backend.Repositories.Tactic.UserCollaborationRepositorie;
import com.example.sport_backend.ServiceInterface.Tactic.IUserCollaborationService;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@AllArgsConstructor
@Slf4j
public class UserCollaborationServiceIMPL implements IUserCollaborationService {
    private UserCollaborationRepositorie userCollaborationRepositorie;

    @Override
    public UserCollaboration addCollaboration(UserCollaboration collaboration) {
        return userCollaborationRepositorie.save(collaboration);
    }

    @Override
    public List<UserCollaboration> getCollaborationsByTactic(Long tacticId) {
        return userCollaborationRepositorie.findByTacticId(tacticId);
    }

    @Override
    public void removeCollaboration(Long id) {
        userCollaborationRepositorie.deleteById(id);

    }

    @Override
    public void updateEditingStatus(Long id, Boolean isEditing) {
        userCollaborationRepositorie.findById(id).ifPresent(collab-> {
            collab.setIsEditing(isEditing);
            userCollaborationRepositorie.save(collab);
        });

    }
}
