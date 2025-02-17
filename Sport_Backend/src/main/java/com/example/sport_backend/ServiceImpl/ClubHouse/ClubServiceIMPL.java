package com.example.sport_backend.ServiceImpl.ClubHouse;

import com.example.sport_backend.Entity.ClubHouse.Club;
import com.example.sport_backend.Repositories.ClubHouse.ClubRepo;
import com.example.sport_backend.ServiceInterface.ClubHouse.IClubService;

import java.util.List;

public class ClubServiceIMPL implements IClubService {

    public ClubRepo clubRepo;


    @Override
    public List<Club> getAllClubs() {
        return clubRepo.findAll();
    }

    @Override
    public Club getClubById(Long id) {
        return clubRepo.findById(id).orElse(null);
    }

    @Override
    public void deleteClub(Long id) {
        clubRepo.deleteById(id);

    }

    @Override
    public Club addClub(Club club) {
        return clubRepo.save(club);
    }

    @Override
    public Club updateClub(Long id, Club club) {
        Club existingClub = getClubById(id);
        if (existingClub != null) {
            existingClub.setName(club.getName());
            existingClub.setLocation(club.getLocation());
            existingClub.setFoundationYear(club.getFoundationYear());
            existingClub.setClubLogo(club.getClubLogo());
            return clubRepo.save(existingClub);
        }
        return null;
    }

}
