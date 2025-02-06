package com.example.sport_backend.Entity.TrainigGround;

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
public class MediaExercice {
    @Id
    @GeneratedValue(strategy= GenerationType.IDENTITY)
    Long id;
    String type;
    String filePath;
}
