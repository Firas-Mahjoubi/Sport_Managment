package com.example.sport_backend.Controllers.ClubHouse;


import com.example.sport_backend.Entity.ClubHouse.Club;
import com.example.sport_backend.Entity.ClubHouse.ClubRequest;
import com.example.sport_backend.Entity.ClubHouse.Player;
import com.example.sport_backend.Repositories.ClubHouse.ClubRepo;
import com.example.sport_backend.ServiceInterface.ClubHouse.IClubService;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("clubs")
@CrossOrigin("*")
public class ClubController {

    private final ClubRepo clubRepository;

    @GetMapping("/getAllClubs")
    public List<Club> getAllClubs() {
        return iClubService.getAllClubs();
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
    public Club updateClub(@PathVariable Long id,@RequestBody Club club) {
        return iClubService.updateClub(id, club);
    }

    @Autowired
    private final IClubService iClubService;

    @GetMapping("/image/{id}")
    public ResponseEntity<byte[]> getImage(@PathVariable Long id) {
        Club club = clubRepository.findById(id).orElseThrow();
        byte[] image = club.getImageUrl(); // type byte[]

        return ResponseEntity.ok()
                .contentType(MediaType.IMAGE_JPEG) // ou IMAGE_PNG selon ton image
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

}
