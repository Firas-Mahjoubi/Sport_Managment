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
public class Card {
    @Id
    @GeneratedValue(strategy= GenerationType.IDENTITY)
    Long id;
    @Enumerated(EnumType.STRING)

    CardType cardType;
    Integer CardTime;
    Integer numberOfPlayer;
    Boolean forHomeTeam;
    @ManyToOne
    @JsonIgnore
    Match match;
    @ManyToOne
    @JsonIgnore
    Player cardTaker;
}
