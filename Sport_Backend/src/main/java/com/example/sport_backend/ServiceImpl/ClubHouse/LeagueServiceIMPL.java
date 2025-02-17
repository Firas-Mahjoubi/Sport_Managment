package com.example.sport_backend.ServiceImpl.ClubHouse;

import com.example.sport_backend.Entity.ClubHouse.League;
import com.example.sport_backend.Repositories.ClubHouse.LeagueRepo;
import com.example.sport_backend.ServiceInterface.ClubHouse.ILeagueService;

import java.util.List;

public class LeagueServiceIMPL implements ILeagueService {
    public LeagueRepo leagueRepo;

    @Override
    public List<League> getAllLeagues() {
        return leagueRepo.findAll();
    }

    @Override
    public League getLeagueById(Long id) {
        return leagueRepo.findById(id).orElse(null);
    }

    @Override
    public League addLeague(League league) {
        return leagueRepo.save(league);
    }

    @Override
    public void deleteLeague(Long id) {
        leagueRepo.deleteById(id);

    }

    @Override
    public League updateLeague(Long id, League league) {
        league.setId(id);
        return leagueRepo.save(league);
    }
}
