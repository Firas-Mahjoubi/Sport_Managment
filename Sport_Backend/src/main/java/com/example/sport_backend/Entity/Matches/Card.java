package com.example.sport_backend.Entity.Matches;

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
    @ManyToOne
            @JsonIgnore
    Match match;
}
