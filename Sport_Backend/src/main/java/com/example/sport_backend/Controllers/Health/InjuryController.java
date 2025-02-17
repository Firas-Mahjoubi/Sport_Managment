package com.example.sport_backend.Controllers.Health;


import com.example.sport_backend.Entity.Health.Injury;
import com.example.sport_backend.ServiceInterface.Health.IInjuryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/injuries")
//@CrossOrigin(origins = "http://localhost:4200") // Autoriser Angular
public class InjuryController {


    @Autowired
    private IInjuryService injuryService;

    @GetMapping("getAllInjuries")
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

}
