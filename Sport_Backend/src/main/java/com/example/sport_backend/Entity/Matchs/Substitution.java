package com.example.sport_backend.Entity.Matchs;
import com.example.sport_backend.Entity.Matchs.LineUp;
import com.example.sport_backend.Entity.Matchs.Match;
import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.FieldDefaults;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;
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

    @ManyToOne
    @JoinColumn(name = "line_up_id", nullable = false)
    @JsonIgnore
    LineUp lineUp;

    @ManyToOne
    @JoinColumn(name = "match_id", nullable = false)
    @JsonIgnore
    Match match;

}
