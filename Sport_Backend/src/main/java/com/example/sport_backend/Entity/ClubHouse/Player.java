package com.example.sport_backend.Entity.ClubHouse;

import com.example.sport_backend.Entity.Health.HealthRecord;
import com.example.sport_backend.Entity.Health.Injury;
import com.example.sport_backend.Entity.TrainigGround.TrainingSession;
import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.FieldDefaults;

import java.util.HashSet;
import java.util.Set;

@Getter
@Setter
@ToString
@AllArgsConstructor
@NoArgsConstructor
@FieldDefaults(level= AccessLevel.PRIVATE)
@Entity
public class Player {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    Long id;

    @Column(name = "first_name")  // 🔄 Corrige le mapping avec la base (skander)

    String FirstName;

    @Column(name = "last_name")   // 🔄 Corrige le mapping avec la base (skander)
    String LastName;
    String position;
    Integer playerNumber;
    String performanceStats;
    String image;
    @ManyToOne
    Team team;


    @OneToMany(cascade = CascadeType.REMOVE, mappedBy = "player")
    private Set<Injury> injuries;


    @JsonIgnore
    @OneToOne
    @JoinColumn(name = "health_record_id", unique = true )
    private HealthRecord healthRecord;
    @JsonIgnore
    @ManyToMany(mappedBy = "players")
    private Set<TrainingSession> trainingSessions = new HashSet<>();

}
