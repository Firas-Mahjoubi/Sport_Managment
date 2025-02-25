package com.example.sport_backend.Entity.Health;

import com.example.sport_backend.Entity.ClubHouse.Player;
import com.example.sport_backend.Entity.Enum.PlanStatus;
import com.example.sport_backend.Entity.Enum.PlanType;
import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.FieldDefaults;

import java.time.LocalDate;

@Getter
@Setter
@ToString
@AllArgsConstructor
@NoArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
@Entity

public class RecoveryPlan {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    Long id;

    String planDescription;
    LocalDate startDate;
    LocalDate estimatedEndDate;
    LocalDate actualEndDate;

    Float progress;
    Integer sessionFrequency;
    Integer sessionDuration;

    @Enumerated(EnumType.STRING)
    PlanType planType;

    LocalDate nextReviewDate;
    String adjustments;

    @Enumerated(EnumType.STRING)
    PlanStatus planStatus;

    @OneToOne
    @JoinColumn(name = "injury_id")
    private Injury injury;

    @ManyToOne
    @JoinColumn(name = "player_id", nullable = false)
    private Player player; // Association avec Player


    // Le playerId est juste utilisé pour la création et n'est pas persisté dans la DB
    @Transient
    private Long playerId;




}
