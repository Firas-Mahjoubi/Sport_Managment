package com.example.sport_backend.Entity.Matchs;

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
