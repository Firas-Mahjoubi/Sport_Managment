package com.example.sport_backend.ServiceInterface.ClubHouse;

import com.example.sport_backend.Entity.ClubHouse.Club;

import java.util.List;

public interface IClubService {
     List<Club> getAllClubs();
     Club getClubById(Long id);
     void deleteClub(Long id);
     Club addClub(Club club);
     Club updateClub(Long id, Club club);

}
