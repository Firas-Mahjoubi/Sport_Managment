package com.example.sport_backend.Controllers.ClubHouse;

import com.example.sport_backend.Entity.ClubHouse.*;
import com.example.sport_backend.Repositories.ClubHouse.ClubRepo;
import com.example.sport_backend.Repositories.ClubHouse.UserRepositories;
import com.example.sport_backend.ServiceInterface.ClubHouse.IClubService;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.util.Collections;
import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/clubs")
@CrossOrigin("*")
public class ClubController {

    private final ClubRepo clubRepository;
    private final UserRepositories userRepositories;

    @Autowired
    private final IClubService iClubService;

    // ✅ Pour l'admin : retourne tous les clubs
    @GetMapping
    public ResponseEntity<List<Club>> getAllClubsForAdmin() {
        return ResponseEntity.ok(clubRepository.findAll());
    }

    @GetMapping("/getAllClubs")
    public ResponseEntity<List<Club>> getAllClubs() {
        List<Club> clubs = clubRepository.findAll();
        return ResponseEntity.ok(clubs);
    }

    @GetMapping("/getClubById/{id}")
    public Club getClubById(@PathVariable Long id) {
        return iClubService.getClubById(id);
    }

    @DeleteMapping("/deleteClub/{id}")
    public void deleteClub(@PathVariable Long id) {
        iClubService.deleteClub(id);
    }

    @PostMapping("/addClub")
    public Club addClub(@ModelAttribute ClubRequest club) throws IOException {
        return iClubService.addClub(club);
    }

    @PutMapping("/updateClub/{id}")
    public Club updateClub(@PathVariable Long id, @RequestBody Club club) {
        return iClubService.updateClub(id, club);
    }

    @GetMapping("/image/{id}")
    public ResponseEntity<byte[]> getImage(@PathVariable Long id) {
        Club club = clubRepository.findById(id).orElseThrow();
        byte[] image = club.getImageUrl();
        return ResponseEntity.ok()
                .contentType(MediaType.IMAGE_JPEG)
                .body(image);
    }

    @GetMapping("/search")
    public List<Club> searchClubs(@RequestParam("keyword") String keyword) {
        return iClubService.searchClubs(keyword);
    }

    @GetMapping("/export/csv")
    public void exportClubsToCsv(HttpServletResponse response) throws IOException {
        response.setContentType("text/csv");
        response.setHeader("Content-Disposition", "attachment; filename=clubs_with_players.csv");
        iClubService.exportClubsToCsv(response.getWriter());
    }

    @GetMapping("/export/pdf/{id}")
    public void exportClubToPdf(@PathVariable Long id, HttpServletResponse response) throws IOException {
        response.setContentType("application/pdf");
        response.setHeader("Content-Disposition", "attachment; filename=club_" + id + ".pdf");
        iClubService.exportClubToPdf(id, response.getOutputStream());
    }

    // ✅ Pour le coach : retourne uniquement son club (via team)
    @GetMapping("/byCoach/{userId}")
    public ResponseEntity<List<Club>> getClubsByCoachTeam(@PathVariable Long userId) {
        User coach = userRepositories.findById(userId)
                .orElseThrow(() -> new RuntimeException("Coach introuvable avec l'ID : " + userId));

        Team team = coach.getTeam();
        if (team == null || team.getClub() == null) {
            return ResponseEntity.ok(Collections.emptyList());
        }

        Club club = team.getClub();
        return ResponseEntity.ok(List.of(club));
    }
}
