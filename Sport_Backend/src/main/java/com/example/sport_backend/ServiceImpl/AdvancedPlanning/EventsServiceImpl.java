package com.example.sport_backend.ServiceImpl.AdvancedPlanning;

import com.example.sport_backend.Entity.AdvancedPlanning.Event;
import com.example.sport_backend.Repositories.AdvancedPlanning.EventRepository;
import com.example.sport_backend.ServiceInterface.AdvancedPlanning.EventsInterface;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@AllArgsConstructor
@Service
public class EventsServiceImpl implements EventsInterface {

    EventRepository eventRepository;

    @Override
    public Event addEvent(Event event) {
        return eventRepository.save(event);
    }

    @Override
    public List<Event> getAllEvents() {
        return (List<Event>) eventRepository.findAll();
    }

    @Override
    public Event updateEvent(Event event) {
        return eventRepository.save(event);
    }

    @Override
    public Event getEvent(Long idEvent) {
        return (Event) eventRepository.findById(idEvent).orElse(null);
    }

    @Override
    public void removeEvent(long idEvent) {eventRepository.deleteById(idEvent);}
}
