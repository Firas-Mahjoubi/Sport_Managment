package com.example.sport_backend.ServiceInterface.ClubHouse;

import com.example.sport_backend.Entity.ClubHouse.League;

import java.util.List;

public interface ILeagueService {
    public List<League> getAllLeagues();
    public League getLeagueById(Long id);
    public League addLeague(League league);
    public void deleteLeague(Long id);
    public League updateLeague(Long id, League league);
}
