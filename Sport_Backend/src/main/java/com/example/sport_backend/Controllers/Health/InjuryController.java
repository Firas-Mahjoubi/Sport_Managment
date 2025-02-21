package com.example.sport_backend.Controllers.Health;


import com.example.sport_backend.Entity.Health.Injury;
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

    @PostMapping("createInjury")
    public Injury createInjury(@RequestBody Injury injury) {
        return injuryService.createInjury(injury);
    }


    @PutMapping("updateInjury/{id}")
    public Injury updateInjury(@PathVariable Long id, @RequestBody Injury injury) {
        return injuryService.updateInjury(id, injury);
    }

    @DeleteMapping("deleteInjury/{id}")
    public void deleteInjury(@PathVariable Long id) {
        injuryService.deleteInjury(id);
    }



    @PostMapping("/assign/injury/{playerId}")
    public ResponseEntity<Injury> assignInjury(
          @PathVariable Long playerId,
          @RequestBody Injury injury) {
      return ResponseEntity.ok(injuryService.assignInjuryToHealthRecord(playerId, injury));
   }

   @PutMapping("/unassign/injury/{injuryId}")
    public ResponseEntity<Void> unassignInjury(@PathVariable Long injuryId) {
      try {
            injuryService.unassignInjuryFromPlayer(injuryId);
            return ResponseEntity.noContent().build();  // Pas de contenu mais succès
       } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();  // Erreur si la blessure n'existe pas
       }
    }

}
