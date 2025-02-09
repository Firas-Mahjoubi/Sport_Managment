package com.example.sport_backend.Entity.TrainigGround;

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
    String description;
    String visibility;
    Integer fitnessLevel;
    Integer techniqueLevel;
    Integer tacticLevel;
    String mainFocus;
    String ageGroup;
    Integer groupSize;

    @ManyToOne(cascade = CascadeType.ALL)
    TrainingSession trainingSession;
    @OneToMany(cascade = CascadeType.ALL)
    private List<MediaExercice> mediaExercices;
    @OneToMany(cascade = CascadeType.ALL)
    private List<Focus> focusList;
    @OneToMany(cascade = CascadeType.ALL)
    private List<Tag> tagList;


}
