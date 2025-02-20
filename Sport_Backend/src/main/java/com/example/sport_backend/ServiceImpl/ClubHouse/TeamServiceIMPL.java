package com.example.sport_backend.ServiceImpl.ClubHouse;

import com.example.sport_backend.Entity.ClubHouse.Team;
import com.example.sport_backend.Repositories.ClubHouse.TeamRepositories;
import com.example.sport_backend.ServiceInterface.ClubHouse.ITeamService;

import java.util.List;

public class TeamServiceIMPL implements ITeamService {
    public TeamRepositories teamRepositories;

    @Override
    public List<Team> getAllTeams() {
        return teamRepositories.findAll();
    }

    @Override
    public Team getTeamById(Long id) {
        return teamRepositories.findById(id).orElse(null);
    }

    @Override
    public Team addTeam(Team team) {
        return teamRepositories.save(team);
    }

    @Override
    public void deleteTeam(Long id) {
teamRepositories.deleteById(id);
    }

    @Override
    public Team updateTeam(Long id, Team team) {
        team.setId(id);
        return teamRepositories.save(team);
    }
}
