package com.example.sport_backend.ServiceInterface.ClubHouse;

import com.example.sport_backend.Entity.ClubHouse.Club;

import java.util.List;

public interface IClubService {
    public List<Club> getAllClubs();
    public Club getClubById(Long id);
    public void deleteClub(Long id);
    public Club addClub(Club club);
    public Club updateClub(Long id, Club club);

}
