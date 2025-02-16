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
public class Goal {
    @Id
    @GeneratedValue(strategy= GenerationType.IDENTITY)
    Long id;
    String goalType;
    String assistType;
    Integer minuteOfPlay;
    @ManyToOne
    Match match;
}
