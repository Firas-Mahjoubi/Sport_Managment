package com.example.sport_backend.ServiceInterface.AdvancedPlanning;

import com.example.sport_backend.Entity.AdvancedPlanning.Event;

import java.util.List;

public interface EventsInterface {
    Event addEvent (Event event);
    List<Event> getAllEvents();
    Event updateEvent (Event event);
    Event getEvent (Long idEvent);
    void removeEvent (long idEvent);

}
