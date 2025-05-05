package com.example.sport_backend.Controllers.ClubHouse;

import com.example.sport_backend.Entity.ClubHouse.Club;
import com.example.sport_backend.Entity.ClubHouse.User;
import com.example.sport_backend.Repositories.ClubHouse.UserRepositories;
import com.example.sport_backend.ServiceInterface.ClubHouse.IUserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RequiredArgsConstructor
@RestController
@RequestMapping("/api/users")
@CrossOrigin(origins = "*") // Allow CORS for frontend access

public class UserController {
    @GetMapping("/dashboard")

    public List<User> getAllUsers() {
        return userService.getAllUsers();
    }

    private final IUserService userService ;
    private UserRepositories userRepositories;

    @PutMapping("/{userId}/assign-team/{teamId}")
    public ResponseEntity<String> assignTeamToUser(@PathVariable Long userId, @PathVariable Long teamId) {
        userService.assignTeamToUser(userId, teamId);
        return ResponseEntity.ok("Team assigned successfully to user.");
    }



    @GetMapping("/test-controller")
    public String testController() {
        return "UserController OK";
    }

    @GetMapping("/unassigned")
    public List<User> getUnassignedUsers() {
        return userService.getUsersWithoutTeam();
    }



}
