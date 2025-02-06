package com.example.sport_backend.Entity.Tactic;

import com.example.sport_backend.Entity.ClubHouse.Team;
import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.FieldDefaults;

import java.util.List;

@Getter
@Setter
@ToString
@AllArgsConstructor
@NoArgsConstructor
@FieldDefaults(level= AccessLevel.PRIVATE)
@Entity
public class Tactic {
    @Id
    @GeneratedValue(strategy= GenerationType.IDENTITY)
    Long id;
    String name;
    String description;
    String formation;
    String trainingFocus;
    @OneToOne
    Team team;
    @OneToMany(mappedBy = "tactic")
    List<MediaTactic>mediaTactics;
}
