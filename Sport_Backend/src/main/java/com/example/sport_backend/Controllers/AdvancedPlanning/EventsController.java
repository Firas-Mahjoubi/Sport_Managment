package com.example.sport_backend.Controllers.AdvancedPlanning;

import com.example.sport_backend.Entity.AdvancedPlanning.Event;
import com.example.sport_backend.ServiceImpl.AdvancedPlanning.EventsServiceImpl;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Tag(name = "Gestion Events")
@RestController
@AllArgsConstructor
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
    public Event updateEvent(Event e) {
        return eventsService.updateEvent(e);
    }


    @GetMapping("getEventById/{idEvent}")
    public Event getEvent(@PathVariable long idEvent) {
        return eventsService.getEvent(idEvent);
    }

    @DeleteMapping("removeEventById/{idEvent}")

    public void removeEvent(@PathVariable long idEvent) {
        eventsService.removeEvent(idEvent);
    }
}
