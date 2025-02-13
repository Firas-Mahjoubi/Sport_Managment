package com.example.sport_backend.Entity.Tactic;

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
public class PlayerMovement {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

     Long playerId;
     String playerName;
     String position;

    @ManyToOne
     Tactic tactic;

    @OneToMany(mappedBy = "playerMovement", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    List<Waypoint> waypoints;
    public void setPath(List<Waypoint> waypoints) {
        this.waypoints = waypoints;
    }
}
