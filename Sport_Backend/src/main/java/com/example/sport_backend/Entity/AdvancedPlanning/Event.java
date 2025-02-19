package com.example.sport_backend.Entity.AdvancedPlanning;

import com.example.sport_backend.Entity.Enum.TypeEvent;
import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.FieldDefaults;
import java.time.LocalDateTime;
import java.util.Set;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@FieldDefaults(level= AccessLevel.PRIVATE)
@Entity
public class Event {
    @Id
    @GeneratedValue(strategy= GenerationType.IDENTITY)
    Long id;
    String nameEvent;
    String description;
    LocalDateTime date;
    String address;
    @Enumerated(EnumType.STRING)
    TypeEvent typeEvent;
    @OneToMany(cascade = CascadeType.ALL, mappedBy="event")
    private Set<Ressources> Ressources;

}
