package com.example.sport_backend.Controllers.ClubHouse;

import com.example.sport_backend.Entity.ClubHouse.User;
import com.example.sport_backend.ServiceInterface.ClubHouse.IUserService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RequiredArgsConstructor
@RestController
@RequestMapping("/users")
@CrossOrigin(origins = "*") // Allow CORS for frontend access

public class UserController {
    @GetMapping("/dashboard")

    public List<User> getAllUsers() {
        return userService.getAllUsers();
    }

    private final IUserService userService ;


}
