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
    @ManyToOne
    @JoinColumn(name = "team_id", nullable = true)
    private Team team;

    @OneToMany(mappedBy = "tactic", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<PlayerMovement> playerMovements;

    @OneToMany(mappedBy = "tactic", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<BallMovement> ballMovements;

    @OneToMany(mappedBy = "tactic", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<MediaTactic> mediaTactics;

    @OneToMany(mappedBy = "tactic", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<TacticSimulation> simulations;
}
