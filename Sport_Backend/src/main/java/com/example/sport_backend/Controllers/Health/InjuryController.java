package com.example.sport_backend.Controllers.Health;


import com.example.sport_backend.Entity.Health.Injury;
import com.example.sport_backend.Entity.Health.InjuryHistory;
import com.example.sport_backend.ServiceImpl.ClubHouse.PlayerServiceIMPL;
import com.example.sport_backend.ServiceImpl.Health.InjuryServiceIMPL;
import com.example.sport_backend.ServiceInterface.Health.IInjuryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/injuries")
@CrossOrigin(origins = "*") // Allow CORS for frontend access
// Permet les requêtes depuis Angular
public class InjuryController {


    @Autowired
    private IInjuryService injuryService;


    @GetMapping("/getAllInjuries")
    public List<Injury> getAllInjuries() {
        return injuryService.getAllInjuries();
    }


    @GetMapping("getInjuryById/{id}")
    public Injury getInjuryById(@PathVariable Long id) {
        return injuryService.getInjuryById(id);
    }


    @PostMapping("createInjury/{playerId}")
    public Injury createInjury(@PathVariable Long playerId, @RequestBody Injury injury) {
        return injuryService.createInjury(playerId, injury);
    }


    @PutMapping("/updateInjury/{id}")
    public ResponseEntity<Injury> updateInjury(@PathVariable Long id, @RequestBody Injury newInjury) {
        return ResponseEntity.ok(injuryService.updateInjury(id, newInjury));
    }







    @GetMapping("/player/{playerId}/injuries")
    public List<Injury> getInjuriesByPlayer(@PathVariable Long playerId) {
        return injuryService.getInjuriesByPlayer(playerId);
    }

    @DeleteMapping("/injury/{injuryId}/archive")
    public ResponseEntity<String> archiveAndRemoveInjury(@PathVariable Long injuryId) {
        injuryService.archiveAndRemoveInjury(injuryId);
        return ResponseEntity.ok("Blessure archivée avec succès !");
    }

    @GetMapping("/player/{playerId}/injury-history")
    public List<InjuryHistory> getInjuryHistoryByPlayer(@PathVariable Long playerId) {
        return injuryService.getInjuryHistoryByPlayer(playerId);
    }






}
