package com.example.sport_backend.ServiceImpl.ClubHouse;

import com.example.sport_backend.Repositories.ClubHouse.UserRepositories;
import com.example.sport_backend.payload.TeamAlertDTO;
import com.example.sport_backend.payload.TeamPlayerCountDTO;
import com.example.sport_backend.Entity.ClubHouse.*;

import com.example.sport_backend.Entity.Enum.Categories;
import com.example.sport_backend.Repositories.ClubHouse.ClubRepo;
import com.example.sport_backend.Repositories.ClubHouse.PlayerRepo;
import com.example.sport_backend.Repositories.ClubHouse.TeamRepositories;
import com.example.sport_backend.ServiceInterface.ClubHouse.IPlayerService;
import jakarta.annotation.PostConstruct;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.util.List;
@Service
@RequiredArgsConstructor
@Slf4j
public class PlayerServiceIMPL implements IPlayerService {



    private final PlayerRepo playerRepo;
    private final ClubRepo clubRepo;
    private final TeamRepositories teamRepositories;
    private final UserRepositories userRepositories;


    @Override
    public List<Player> getAllPlayers() {
        return playerRepo.findAll();
    }

    @Override
    public Player getPlayerById(Long id) {
        Player player = playerRepo.findById(id).orElse(null);
        if (player == null) return null;

        // Team name
        if (player.getTeam() != null) {
            player.setTeamName(player.getTeam().getName());

            // Club name via team
            if (player.getTeam().getClub() != null) {
                player.setClubName(player.getTeam().getClub().getName());
            } else {
                player.setClubName("Not assigned");
            }

        } else {
            player.setTeamName("Not assigned");
            player.setClubName("Not assigned");
        }

        return player;
    }



    @Override
    public Player addPlayer(PlayerRequest player) throws IOException {
        Club club=clubRepo.findById(player.getClubId()).orElseThrow(()->new EntityNotFoundException("Club not found"));
        Team team =teamRepositories.findByNameAndCategorie(club.getName(), Categories.valueOf(player.getCategory().toString())).orElseThrow(()->new EntityNotFoundException("Team not found"));

        return playerRepo.save(Player.builder()
                .FirstName(player.getFirstName())
                .LastName(player.getLastName())
                .imageUrl(player.getImageUrl().getBytes())
                .playerNumber(player.getPlayerNumber())
                .position(player.getPosition())
                .performanceStats(player.getPerformanceStats())
                .birthDate(player.getBirthDate()) // ✅ AJOUT ICI
                .club(club)
                .team(team)
                .build());
    }

    @Override
    public void deletePlayer(Long id) {
        playerRepo.deleteById(id);
    }

    @Override
    public Player updatePlayer(Long id, Player player) {
        player.setId(id);
        return playerRepo.save(player);
    }

    @Override
    public List<TeamPlayerCountDTO> getPlayerCountsPerTeam() {
        return playerRepo.countPlayersPerTeam();
    }

    @Override
    public List<TeamAlertDTO> getTeamRosterAlerts() {
        return playerRepo.getTeamsWithIncompleteRoster();
    }




    // ✅ Récupérer uniquement les joueurs qui n'ont pas encore de HealthRecord
    @Override
    public List<Player> getPlayersWithoutHealthRecord() {
        return playerRepo.findPlayersWithoutHealthRecord();
    }

    @Override
    public List<Player> getSortedPlayers(String field, String direction) {
        if (direction.equalsIgnoreCase("desc")) {
            return playerRepo.findAll(org.springframework.data.domain.Sort.by(field).descending());
        } else {
            return playerRepo.findAll(org.springframework.data.domain.Sort.by(field).ascending());
        }
    }
    @PostConstruct
    public void testRelations() {
        List<Player> players = playerRepo.findAll();

        for (Player p : players) {
            String teamCategory = (p.getTeam() != null) ? p.getTeam().getCategories().toString() : "Aucune catégorie";
            String clubName = (p.getTeam() != null && p.getTeam().getClub() != null)
                    ? p.getTeam().getClub().getName()
                    : "Aucun club";

            System.out.println("➡️ Joueur : " + p.getFirstName() + " " + p.getLastName() +
                    " | Équipe : " + teamCategory +
                    " | Club : " + clubName);
        }
    }



    //////////////////////////////////////

}
