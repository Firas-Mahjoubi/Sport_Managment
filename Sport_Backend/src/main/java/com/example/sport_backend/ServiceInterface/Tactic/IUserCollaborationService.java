package com.example.sport_backend.ServiceInterface.Tactic;


import com.example.sport_backend.Entity.Tactic.UserCollaboration;

import java.util.List;

public interface IUserCollaborationService {
    UserCollaboration addCollaboration(UserCollaboration collaboration);
    List<UserCollaboration> getCollaborationsByTactic(Long tacticId);
    void removeCollaboration(Long id);
    void updateEditingStatus(Long id, Boolean isEditing);
}
