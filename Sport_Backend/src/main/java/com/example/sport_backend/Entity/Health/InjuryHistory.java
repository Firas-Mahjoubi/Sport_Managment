package com.example.sport_backend.Entity.Health;


import com.example.sport_backend.Entity.ClubHouse.Player;
import com.example.sport_backend.Entity.Enum.Severity;
import com.example.sport_backend.Entity.Enum.Status;
import com.example.sport_backend.Entity.Enum.Type;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDate;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class InjuryHistory {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private LocalDate date;
    private String description;

    @Enumerated(EnumType.STRING)
    private Type type;

    @Enumerated(EnumType.STRING)
    private Severity severity;

    @Enumerated(EnumType.STRING)
    private Status status;

    @ManyToOne
    @JoinColumn(name = "player_id", nullable = false)
    private Player player;



    public InjuryHistory(Injury injury) {
        this.date = injury.getDate();
        this.description = injury.getDescription();
        this.type = injury.getType();
        this.severity = injury.getSeverity();
        this.status = injury.getStatus();
        this.player = injury.getPlayer();
    }
}


