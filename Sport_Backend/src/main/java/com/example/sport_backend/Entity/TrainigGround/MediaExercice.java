package com.example.sport_backend.Entity.TrainigGround;

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
public class MediaExercice {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    Long id;

    String mediaType; // "image" ou "video"
    String mediaUrl;  // URL de stockage du fichier
    @JsonIgnore
    @ManyToOne
    @JoinColumn(name = "exercice_id", nullable = false)
    private Exercice exercice;
}
