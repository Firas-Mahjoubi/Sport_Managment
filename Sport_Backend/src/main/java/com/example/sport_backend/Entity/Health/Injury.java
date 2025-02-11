package com.example.sport_backend.Entity.Health;

import com.example.sport_backend.Entity.ClubHouse.Player;
import com.example.sport_backend.Entity.Enum.Serverity;
import com.example.sport_backend.Entity.Enum.Status;
import com.example.sport_backend.Entity.Enum.Type;
import com.example.sport_backend.Entity.Enum.ZoneAffectee;
import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.FieldDefaults;

import java.time.LocalDate;

@Getter
@Setter
@ToString
@AllArgsConstructor
@NoArgsConstructor
@FieldDefaults(level= AccessLevel.PRIVATE)
@Entity
public class Injury {
    @Id
    @GeneratedValue(strategy= GenerationType.IDENTITY)
    Long id;
    LocalDate date;
    @Enumerated(EnumType.STRING)
    Type type;
    @Enumerated(EnumType.STRING)
    Serverity serverity;
    String description;
    @Enumerated(EnumType.STRING)
    Status status;
    @Enumerated(EnumType.STRING)
    ZoneAffectee zoneAffectee;
    String cause;

    @OneToOne
    private RecoveryPlan recoveryplan;

    @ManyToOne
    Player player;
}
