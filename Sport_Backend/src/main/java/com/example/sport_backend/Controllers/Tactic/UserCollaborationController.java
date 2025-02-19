package com.example.sport_backend.Controllers.Tactic;

import com.example.sport_backend.Entity.Tactic.UserCollaboration;
import com.example.sport_backend.ServiceInterface.Tactic.IUserCollaborationService;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@AllArgsConstructor
@RequestMapping("/api/user-collaboration")
@CrossOrigin(origins = "*")
public class UserCollaborationController{
    @PostMapping("add")
    public UserCollaboration addCollaboration(@RequestBody UserCollaboration collaboration) {
        return userCollaborationService.addCollaboration(collaboration);
    }
    @GetMapping("tactic/{tacticId}")
    public List<UserCollaboration> getCollaborationsByTactic(@PathVariable Long tacticId) {
        return userCollaborationService.getCollaborationsByTactic(tacticId);
    }
    @DeleteMapping("delete/{id}")
    public void removeCollaboration(@PathVariable Long id) {
        userCollaborationService.removeCollaboration(id);
    }
    @PutMapping("update-editing/{id}")
    public void updateEditingStatus(@PathVariable Long id,@RequestParam Boolean isEditing) {
        userCollaborationService.updateEditingStatus(id, isEditing);
    }

    private IUserCollaborationService userCollaborationService;
}
