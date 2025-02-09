package com.example.sport_backend.Entity.TrainigGround;

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
public class Focus {
    @Id
    @GeneratedValue(strategy= GenerationType.IDENTITY)
    Long id;
    String focusType;
    Integer focusValue;

    @ManyToOne(cascade = CascadeType.ALL)
    Exercice exercice;
}
