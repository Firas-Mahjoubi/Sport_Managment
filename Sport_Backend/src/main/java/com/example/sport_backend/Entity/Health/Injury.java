package com.example.sport_backend.Entity.Health;

import com.example.sport_backend.Entity.ClubHouse.Player;
import com.example.sport_backend.Entity.Enum.Severity;
import com.example.sport_backend.Entity.Enum.Status;
import com.example.sport_backend.Entity.Enum.Type;
import com.example.sport_backend.Entity.Enum.ZoneAffectee;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.PastOrPresent;
import jakarta.validation.constraints.Size;
import lombok.*;
import lombok.experimental.FieldDefaults;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

@Getter
@Setter
@ToString
@AllArgsConstructor
@NoArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
@Entity

public class Injury {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    Long id;


    LocalDate date;



    @Enumerated(EnumType.STRING)
    Type type;



    @Enumerated(EnumType.STRING)
    Severity severity;


    String description;



    @Enumerated(EnumType.STRING)
    Status status;

    @Enumerated(EnumType.STRING)
    @NotNull(message = "La zone affectée est obligatoire.")
    ZoneAffectee zoneAffectee;


    @Size(max = 255, message = "La cause ne peut pas dépasser 255 caractères.")
    String cause;


    @JsonIgnore
    @OneToOne(mappedBy = "injury", cascade = CascadeType.REMOVE, orphanRemoval = true)
    private RecoveryPlan recoveryPlan;





     @ManyToOne
    @JsonIgnoreProperties("injuries")  // ✅ Évite les problèmes de sérialisation
    @JoinColumn(name = "player_id", nullable = false)
    private Player player;
}
