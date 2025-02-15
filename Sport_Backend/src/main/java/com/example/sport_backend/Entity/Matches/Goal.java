package com.example.sport_backend.Entity.Matches;

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
public class Goal {
    @Id
    @GeneratedValue(strategy= GenerationType.IDENTITY)
    Long id;
    Integer ScorerNumber;
    Integer AssisterNumber;
    @Enumerated(EnumType.STRING)
    Goaltype goalType;
    @Enumerated(EnumType.STRING)
    AssistType assistType;
    Integer timing;
    @ManyToOne
            @JsonIgnore
    Match match;
}
