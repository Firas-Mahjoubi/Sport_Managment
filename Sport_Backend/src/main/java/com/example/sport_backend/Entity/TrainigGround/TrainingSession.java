package com.example.sport_backend.Entity.TrainigGround;

import com.example.sport_backend.Entity.ClubHouse.User;
import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.FieldDefaults;

import java.sql.Time;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

@Getter
@Setter
@ToString
@AllArgsConstructor
@NoArgsConstructor
@FieldDefaults(level= AccessLevel.PRIVATE)
@Entity
public class TrainingSession {
    @Id
    @GeneratedValue(strategy= GenerationType.IDENTITY)
    Long id;
    String name;
    String description;
    String target;
    LocalDate date;
    LocalDateTime startTime;
    LocalDateTime endTime;
    String location;
    String address;
    @JsonIgnore
    @OneToMany(cascade = CascadeType.ALL,mappedBy = "trainingSession")
    private List<Exercice> exercices;
}
