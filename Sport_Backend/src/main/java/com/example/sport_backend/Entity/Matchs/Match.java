package com.example.sport_backend.Entity.Matchs;

import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.FieldDefaults;

import java.sql.Time;
import java.time.LocalDate;

@Getter
@Setter
@ToString
@AllArgsConstructor
@NoArgsConstructor
@FieldDefaults(level= AccessLevel.PRIVATE)
@Entity
@Table(name = "game_match") // Rename to avoid SQL conflicts

public class Match {
    @Id
    @GeneratedValue(strategy= GenerationType.IDENTITY)
    Long id;
    String type;
    String adversaire;
    Boolean isHomeGame;
    LocalDate date;
    Time startTime;
    Time endTime;
    Time meetingTime;
    String meeetingPoint;
    String address;
    Integer homeGoals;
    Integer awayGoals;
}
