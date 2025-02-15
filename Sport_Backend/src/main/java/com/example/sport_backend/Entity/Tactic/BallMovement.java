package com.example.sport_backend.Entity.Tactic;

import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.FieldDefaults;

@Getter
@Setter
@ToString
@AllArgsConstructor
@NoArgsConstructor
@FieldDefaults(level= AccessLevel.PRIVATE)
@Entity
public class BallMovement {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
     Long id;

     String startPosition;
     String endPosition;
     String movementType; // e.g., "Pass", "Dribble", "Shoot"

    @ManyToOne
     Tactic tactic;
}
