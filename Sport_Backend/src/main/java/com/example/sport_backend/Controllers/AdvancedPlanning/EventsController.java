package com.example.sport_backend.Controllers.AdvancedPlanning;

import com.example.sport_backend.Entity.AdvancedPlanning.Event;
import com.example.sport_backend.ServiceImpl.AdvancedPlanning.EventsServiceImpl;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Tag(name = "Gestion Events")
@RestController
@AllArgsConstructor
@CrossOrigin(origins = "http://localhost:4200", methods = {RequestMethod.GET, RequestMethod.POST, RequestMethod.PUT, RequestMethod.DELETE})
public class EventsController {
    EventsServiceImpl eventsService;

    @GetMapping("/getEvent")

    public List<Event> retrieveAllRessources() {
        return eventsService.getAllEvents();
    }

    @PostMapping("/addEvent")
    public Event addEvent(@RequestBody Event e) {
        return eventsService.addEvent(e);
    }

    @PutMapping("/updateEvent")
    public ResponseEntity<Event> updateEvent(@RequestBody Event e) {
        Event updatedEvent = eventsService.updateEvent(e);
        if (updatedEvent != null) {
            return ResponseEntity.ok(updatedEvent); // Retourne 200 OK avec l'événement mis à jour
        } else {
            return ResponseEntity.notFound().build(); // Retourne 404 si l'événement n'existe pas
        }
    }



    @GetMapping("getEventById/{idEvent}")
    public Event getEvent(@PathVariable long idEvent) {
        return eventsService.getEvent(idEvent);
    }

    @DeleteMapping("/removeEventById/{idEvent}")
    public ResponseEntity<Void> removeEvent(@PathVariable long idEvent) {
        System.out.println("Suppression de l'événement avec ID : " + idEvent);
        boolean isDeleted = eventsService.removeEvent(idEvent);  // Appelle le service pour supprimer l'événement
        if (isDeleted) {
            System.out.println("Événement supprimé avec succès");
            return ResponseEntity.noContent().build();  // Renvoie un code 204 si la suppression a réussi
        }
        System.out.println("Événement non trouvé pour ID : " + idEvent);
        return ResponseEntity.status(HttpStatus.NOT_FOUND).build();  // Renvoie un code 404 si l'événement n'a pas été trouvé
    }


}
