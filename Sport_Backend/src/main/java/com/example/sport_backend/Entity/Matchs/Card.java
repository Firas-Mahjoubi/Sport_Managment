package com.example.sport_backend.Entity.Matchs;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
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
    String cardType;
    Integer minuteOfPlay;
}
