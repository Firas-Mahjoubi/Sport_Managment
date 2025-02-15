package com.example.sport_backend.Entity.Matches;

import com.example.sport_backend.Entity.ClubHouse.Player;
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
public class Substitution {
    @Id
    @GeneratedValue(strategy= GenerationType.IDENTITY)
    Long id;
    Integer minuteOfPlay;
    Integer PlayerInNumber;
    Integer PlayerOutNumber;
    @ManyToOne
    Match match;
}
