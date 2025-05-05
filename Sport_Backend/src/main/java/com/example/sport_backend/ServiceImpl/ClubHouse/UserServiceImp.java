package com.example.sport_backend.ServiceImpl.ClubHouse;


import com.example.sport_backend.Entity.ClubHouse.Club;
import com.example.sport_backend.Entity.ClubHouse.Team;
import com.example.sport_backend.Entity.ClubHouse.User;
import com.example.sport_backend.Repositories.ClubHouse.TeamRepositories;
import com.example.sport_backend.Repositories.ClubHouse.UserRepositories;
import com.example.sport_backend.ServiceInterface.ClubHouse.IUserService;
import jakarta.persistence.EntityNotFoundException;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@AllArgsConstructor
@Slf4j
public class UserServiceImp implements IUserService {

    private UserRepositories userRepository;
    private TeamRepositories teamRepositories;

    @Override
    public List<User> getAllUsers() {
        return userRepository.findAll();  // Fetch all users, adjust the query if necessary
    }

    @Override
    public void assignTeamToUser(Long userId, Long teamId) {

        User user = userRepository.findById(userId)
                .orElseThrow(() -> new EntityNotFoundException("User not found with ID: " + userId));

        Team team = teamRepositories.findById(teamId)
                .orElseThrow(() -> new EntityNotFoundException("Team not found with ID: " + teamId));

        user.setTeam(team);
        userRepository.save(user);
    }

    @Override
    public List<User> getUsersWithoutTeam() {
        return userRepository.findByTeamIsNull();
    }




}
