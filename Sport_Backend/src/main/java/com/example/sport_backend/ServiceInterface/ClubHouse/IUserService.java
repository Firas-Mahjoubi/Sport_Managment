package com.example.sport_backend.ServiceInterface.ClubHouse;


import com.example.sport_backend.Entity.ClubHouse.Club;
import com.example.sport_backend.Entity.ClubHouse.User;

import java.util.List;

public interface IUserService {
    List<User> getAllUsers();

    void assignTeamToUser(Long userId, Long teamId);


    List<User> getUsersWithoutTeam();

}
