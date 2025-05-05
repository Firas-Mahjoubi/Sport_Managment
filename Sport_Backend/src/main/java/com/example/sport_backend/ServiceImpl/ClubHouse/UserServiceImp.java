package com.example.sport_backend.ServiceImpl.ClubHouse;


import com.example.sport_backend.Entity.ClubHouse.User;
import com.example.sport_backend.Repositories.ClubHouse.UserRepositories;
import com.example.sport_backend.ServiceInterface.ClubHouse.IUserService;
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

    @Override
    public List<User> getAllUsers() {
        return userRepository.findAll();  // Fetch all users, adjust the query if necessary
    }
}
