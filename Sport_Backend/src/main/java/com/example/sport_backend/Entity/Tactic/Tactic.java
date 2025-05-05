package com.example.sport_backend.Entity.Tactic;

import com.example.sport_backend.Entity.ClubHouse.Team;
import com.example.sport_backend.Entity.ClubHouse.User;
import com.example.sport_backend.Entity.Enum.TrainingFocus;
import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
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
    @NotBlank(message = "Le nom est obligatoire")
    String name;
    @NotBlank()
    String description;
    @NotBlank()
    String formation;
    @Enumerated(EnumType.STRING)
    TrainingFocus trainingFocus;
    @ManyToOne
    @JoinColumn(name = "team_id", nullable = true)
    @JsonIgnore
    private Team team;

    @OneToMany(mappedBy = "tactic", cascade = CascadeType.ALL)
    @JsonIgnore
    private List<PlayerMovement> playerMovements;

    @OneToMany(mappedBy = "tactic", cascade = CascadeType.ALL)
    @JsonIgnore
    private List<BallMovement> ballMovements;

    @OneToMany(mappedBy = "tactic", cascade = CascadeType.ALL)
    @JsonIgnore
    private List<MediaTactic> mediaTactics;

    @OneToMany(mappedBy = "tactic", cascade = CascadeType.ALL)
    @JsonIgnore
    private List<TacticSimulation> simulations;

    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false) // Assuming user is required for each tactic
    @JsonIgnore
    private User user;

    public static double calculateFormationPercentage(String formation, List<Tactic> tactics) {
        long totalTactics = tactics.size();
        long formationCount = tactics.stream()
                .filter(tactic -> tactic.getFormation().equals(formation))
                .count();
        return (double) formationCount / totalTactics * 100;
    }
    public static double calculateTrainingFocusPercentage(TrainingFocus focus, List<Tactic> tactics) {
        long totalTactics = tactics.size();
        long focusCount = tactics.stream()
                .filter(tactic -> tactic.getTrainingFocus().equals(focus))
                .count();
        return (double) focusCount / totalTactics * 100;
    }

}
