package com.example.sport_backend.Entity.Matches;

import com.example.sport_backend.Entity.ClubHouse.Player;
import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import jakarta.validation.constraints.Size;
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
public class LineUp {
    @Id
    @GeneratedValue(strategy= GenerationType.IDENTITY)
    Long id;
    String formation;
    @ElementCollection
    @Size(max = 11)
    private List<Long> homeTeamplayerNumbers;
    @ElementCollection
    @Size(max = 7)
    private List<Long> homeTeamplayerSubsNumbers;
    @ElementCollection
    @Size(max = 11)
    private  List<Long> awayTeamPlayerNumbers;
    @ElementCollection
    @Size(max = 7)
    private List<Long> awayTeamPlayerSubsNumbers;
@OneToOne
        @JsonIgnore
    Match match;


}
