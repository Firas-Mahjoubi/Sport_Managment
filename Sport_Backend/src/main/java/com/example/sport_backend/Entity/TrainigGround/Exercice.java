package com.example.sport_backend.Entity.TrainigGround;

import com.example.sport_backend.Entity.Enum.Visibility;
import com.fasterxml.jackson.annotation.JsonIgnore;
import io.swagger.v3.oas.annotations.tags.Tags;
import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.FieldDefaults;

import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Getter
@Setter
@ToString
@AllArgsConstructor
@NoArgsConstructor
@FieldDefaults(level= AccessLevel.PRIVATE)
@Entity
public class Exercice {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    Long id;

    String name;

    @Enumerated(EnumType.STRING)
    Visibility visibility;
    String description;
    Integer fitnessLevel;
    Integer techniqueLevel;
    Integer tacticLevel;
    String mainFocus;
    String ageGroup;
    Integer groupSize;
    Integer durationMinutes;
    String imageUrl;
    @JsonIgnore
    @ManyToMany(mappedBy="exercices", cascade = {CascadeType.PERSIST, CascadeType.MERGE})
    private Set<TrainingSession> trainingSessions = new HashSet<>();

    @ManyToMany(cascade = {CascadeType.PERSIST, CascadeType.MERGE})
    @JoinTable(
            name = "exercise_tag",
            joinColumns = @JoinColumn(name = "exercise_id"),
            inverseJoinColumns = @JoinColumn(name = "tag_id")
    )
    private Set<Tag> tags = new HashSet<>();

    @OneToMany(cascade = CascadeType.ALL, mappedBy = "exercice", orphanRemoval = true)
    private List<MediaExercice> mediaExercices;

}
