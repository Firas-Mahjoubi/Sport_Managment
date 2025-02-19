package com.example.sport_backend.Entity.Matchs;

import com.example.sport_backend.Entity.ClubHouse.Player;
import com.fasterxml.jackson.annotation.JsonIgnore;
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
public class Goal {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Integer scorerNumber;  // Player's number (scorer)

    private Integer timing;  // Goal timing in match

    @ManyToOne
    @JsonIgnore
    private Match match;  // The match to which the goal belongs

    @ManyToOne
    @JsonIgnore
    private Player scorer;  // The player who scored the goal (can be null)

    public void setScorer(Player scorer) {
        if (scorer != null) {
            this.scorer = scorer;
            this.scorerNumber = scorer.getPlayerNumber();  // Assume Player has a getNumber method
        }
    }
}
