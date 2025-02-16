package com.example.sport_backend.Controllers.AdvancedPlanning;


import com.example.sport_backend.Entity.AdvancedPlanning.Event;
import com.example.sport_backend.Entity.AdvancedPlanning.Ressources;
import com.example.sport_backend.ServiceImpl.AdvancedPlanning.RessourcesServiceImpl;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Tag(name = "Gestion Ressources")
@RestController
@AllArgsConstructor
public class RessourcesController {
    RessourcesServiceImpl ressourcesService;
    @GetMapping("/getRessources")

    public List<Ressources> retrieveAllRessources() {
        return ressourcesService.getAllRessources();
    }

    @PostMapping("/addRessources")
    public Ressources addRessources(@RequestBody Ressources r ) {
        return ressourcesService.addRessources(r);
    }

    @PutMapping("/updateRessources")
    public Ressources updateRessources(Ressources r) {
        return ressourcesService.updateRessources(r);
    }


    @GetMapping("getRessourceById/{idRessource}")
    public Ressources getRessource(@PathVariable long idRessource) {
        return ressourcesService.getRessources(idRessource);
    }

    @DeleteMapping("removeRessourceById/{idRessource}")

    public void removeRessource(@PathVariable long idRessource) {ressourcesService.removeRessources(idRessource);
    }

}
