package com.example.sport_backend.Controllers.ClubHouse;


import com.example.sport_backend.Entity.ClubHouse.Club;
import com.example.sport_backend.ServiceImpl.ClubHouse.ClubServiceIMPL;
import lombok.AllArgsConstructor;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
public class ClubController {
    private  ClubServiceIMPL ClubServiceIMPL;

    @GetMapping("/getAllClubs")
    public List<Club> getAllClubs() {
        return ClubServiceIMPL.getAllClubs();
    }
@GetMapping("/getclub/{id}")
    public Club getClubById(@PathVariable Long id) {
        return ClubServiceIMPL.getClubById(id);
    }

    @DeleteMapping("/deleteclub/{id}")
    public void deleteClub(Long id) {
        ClubServiceIMPL.deleteClub(id);
    }

    @PostMapping("/addclub")
    public Club addClub(@RequestBody Club club) {
        return ClubServiceIMPL.addClub(club);
    }

    @PutMapping("/updateclub/{id}")
    public Club updateClub(@PathVariable Long id, @RequestBody Club club) {
        return ClubServiceIMPL.updateClub(id, club);
    }
}
