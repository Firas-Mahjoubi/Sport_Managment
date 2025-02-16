package com.example.sport_backend.Entity.Health;

import com.example.sport_backend.Entity.ClubHouse.Player;
import com.example.sport_backend.Entity.Enum.*;
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
public class HealthRecord {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    Long id;

    LocalDate date;

    @Enumerated(EnumType.STRING)
    Fatigue fatigue;

    @Enumerated(EnumType.STRING)
    EtatPhysique etatPhysique;

    @Enumerated(EnumType.STRING)
    DouleursMusculaires douleursMusculaires;

    @Enumerated(EnumType.STRING)
    Intensite intensite;

    @Enumerated(EnumType.STRING)
    StatusJoueur statusJoueur;

    String commentaire;

    @OneToOne(mappedBy = "healthRecord")
    private Player player;
}
