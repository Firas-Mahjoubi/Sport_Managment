package com.example.sport_backend.Controllers.ClubHouse;


import com.example.sport_backend.Entity.ClubHouse.Club;
import com.example.sport_backend.ServiceImpl.ClubHouse.ClubServiceIMPL;
import com.example.sport_backend.ServiceInterface.ClubHouse.IClubService;
import lombok.AllArgsConstructor;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("clubs")
@CrossOrigin("*")
public class ClubController {

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
    public Club addClub(@RequestBody Club club) {
        return iClubService.addClub(club);
    }

    @PutMapping("/updateClub/{id}")
    public Club updateClub(@PathVariable Long id,@RequestBody Club club) {
        return iClubService.updateClub(id, club);
    }

    @Autowired
    private final IClubService iClubService;



}
