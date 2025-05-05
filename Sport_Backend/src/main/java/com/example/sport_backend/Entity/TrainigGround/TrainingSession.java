package com.example.sport_backend.Entity.TrainigGround;

import com.example.sport_backend.Entity.ClubHouse.Player;
import com.example.sport_backend.Entity.ClubHouse.Team;
import com.example.sport_backend.Entity.ClubHouse.User;
import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.*;
import lombok.experimental.FieldDefaults;

import javax.annotation.Nullable;
import java.sql.Time;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

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
    @NotBlank(message = "Le nom est obligatoire")
    @Size(min = 3, message = "Le nom doit contenir au moins 3 caractères")
    String name;
    String intensity;  // Low, Medium, High
    @Nullable
    String category;   // Attacking, Tactical, Physical

    LocalDate date;
    @NotBlank()
    String startTime;  // Change from LocalDateTime to String
    @NotBlank()
    String endTime;    // Change from LocalDateTime to String



    //LocalDateTime endTime;
    String location;
    // ✅ Participants Section
    Integer attendingPlayers;
    Integer questionablePlayers;
    Integer absentPlayers;

    // ✅ Notes Section 
    String beforeSessionNotes;
    String afterSessionNotes;
    @JsonIgnore
    @ManyToMany
    @JoinTable(
            name = "training_session_players",
            joinColumns = @JoinColumn(name = "session_id"),
            inverseJoinColumns = @JoinColumn(name = "player_id")
    )
    private Set<Player> players = new HashSet<>();
    @JsonIgnore
    @ManyToMany(cascade = {CascadeType.PERSIST, CascadeType.MERGE})
    @JoinTable(
            name = "training_session_exercises",
            joinColumns = @JoinColumn(name = "session_id"),
            inverseJoinColumns = @JoinColumn(name = "exercise_id")
    )
    private Set<Exercice> exercices = new HashSet<>();

}
