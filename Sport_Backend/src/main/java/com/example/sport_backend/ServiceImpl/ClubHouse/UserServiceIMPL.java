package com.example.sport_backend.ServiceImpl.ClubHouse;

import com.example.sport_backend.Repositories.ClubHouse.UserRepositories;
import com.example.sport_backend.ServiceInterface.ClubHouse.IUserService;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

@Service
@AllArgsConstructor
@Slf4j
public class UserServiceIMPL implements IUserService {
    public UserRepositories userRepositories;
}
