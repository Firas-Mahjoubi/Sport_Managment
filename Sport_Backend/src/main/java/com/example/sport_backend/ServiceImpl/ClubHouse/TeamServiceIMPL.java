package com.example.sport_backend.ServiceImpl.ClubHouse;

import com.example.sport_backend.Entity.ClubHouse.Club;
import com.example.sport_backend.Entity.ClubHouse.Team;
import com.example.sport_backend.Entity.ClubHouse.TeamRequest;
import com.example.sport_backend.Repositories.ClubHouse.ClubRepo;
import com.example.sport_backend.Repositories.ClubHouse.TeamRepositories;
import com.example.sport_backend.ServiceInterface.ClubHouse.ITeamService;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.List;
@Service
@AllArgsConstructor
@Slf4j
public class TeamServiceIMPL implements ITeamService {
    public TeamRepositories teamRepositories;
    public ClubRepo clubRepo;

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
        return null;
    }

    @Override
    public Team addTeam(TeamRequest request) {
        Team team = new Team();
        team.setName(request.getName());
        team.setCategories(request.getCategories());

        Club club = clubRepo.findById(request.getClubId())
                .orElseThrow(() -> new RuntimeException("Club not found"));

        team.setClub(club); // 🔥 liaison automatique

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
