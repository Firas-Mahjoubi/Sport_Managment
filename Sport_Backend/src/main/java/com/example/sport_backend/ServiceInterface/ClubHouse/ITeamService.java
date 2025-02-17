package com.example.sport_backend.ServiceInterface.ClubHouse;

import com.example.sport_backend.Entity.ClubHouse.Team;

import java.util.List;

public interface ITeamService {
    public List<Team> getAllTeams();
    public Team getTeamById(Long id);
    public Team addTeam(Team team);
    public void deleteTeam(Long id);
    public Team updateTeam(Long id, Team team);
}
