package com.example.sport_backend.Entity.Matchs;
import com.example.sport_backend.Entity.Matchs.LineUp;
import com.example.sport_backend.Entity.Matchs.Match;
import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.FieldDefaults;
import org.hibernate.engine.internal.Cascade;

@Getter
@Setter
@ToString
@AllArgsConstructor
@NoArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
@Entity
public class Substitution {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    Long id;

    Integer minuteOfPlay;  // The minute of the substitution
    Integer playerInNumber;  // The player number of the player coming in
    Integer playerOutNumber;  // The player number of the player going out
    Boolean isHomeTeam;

    @ManyToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "line_up_id")  // Reference to the LineUp
            @JsonIgnore
    LineUp lineUp;  // The associated lineup for the substitution

    @ManyToOne(cascade= CascadeType.ALL)
    @JoinColumn(name = "match_id")  // Reference to the match
            @JsonIgnore
    Match match;  // The match associated with the substitution
}
