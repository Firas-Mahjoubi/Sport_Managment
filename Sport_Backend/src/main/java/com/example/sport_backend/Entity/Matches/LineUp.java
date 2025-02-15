package com.example.sport_backend.Entity.Matches;

import com.example.sport_backend.Entity.ClubHouse.Player;
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
public class LineUp {
    @Id
    @GeneratedValue(strategy= GenerationType.IDENTITY)
    Long id;
    String formation;
    @ElementCollection
    private List<Long> playerNumbers;
@OneToOne
    Match match;


}
