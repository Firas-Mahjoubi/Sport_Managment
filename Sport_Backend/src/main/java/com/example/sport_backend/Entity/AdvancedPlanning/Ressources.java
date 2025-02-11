package com.example.sport_backend.Entity.AdvancedPlanning;

import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.FieldDefaults;

@Getter
@Setter
@ToString
@AllArgsConstructor
@NoArgsConstructor
@FieldDefaults(level= AccessLevel.PRIVATE)
@Entity
public class Ressources {
    @Id
    @GeneratedValue(strategy= GenerationType.IDENTITY)
    Long id;
    String RessourceName;
    Integer RessourceNumber;

    @ManyToOne
    Event event;
}
