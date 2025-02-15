package com.example.sport_backend.Entity.ClubHouse;

import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.FieldDefaults;

@Getter
@Setter
@ToString
@AllArgsConstructor
@NoArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
@Entity
public class Player {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    Long id;
    String FirstName;
    String LastName;
    String position;
    Integer playerNumber;
    String performanceStats;
    @ManyToOne
    Team team;
}
