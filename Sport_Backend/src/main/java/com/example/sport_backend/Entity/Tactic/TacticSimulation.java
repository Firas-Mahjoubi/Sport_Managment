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
public class TacticSimulation {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
     Long id;

     Double speed;
     Boolean isPaused;
     Boolean isPlaying;

    @ManyToOne
     Tactic tactic;
}
