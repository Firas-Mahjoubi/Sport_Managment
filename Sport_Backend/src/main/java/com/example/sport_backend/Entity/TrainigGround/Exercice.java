package com.example.sport_backend.Entity.TrainigGround;

import com.fasterxml.jackson.annotation.JsonIgnore;
import io.swagger.v3.oas.annotations.tags.Tags;
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
public class Exercice {
    @Id
    @GeneratedValue(strategy= GenerationType.IDENTITY)
    Long id;
    String name;
    Boolean visibility;
    String description;
    Integer fitnessLevel;
    Integer techniqueLevel;
    Integer tacticLevel;
    String mainFocus;
    String ageGroup;
    Integer groupSize;
    List<String> tags;

    @JsonIgnore
    @ManyToOne(cascade = CascadeType.ALL)
    TrainingSession trainingSession;
    @JsonIgnore
    @OneToMany(cascade = CascadeType.ALL,mappedBy = "exercice")
    private List<MediaExercice> mediaExercices;


}
