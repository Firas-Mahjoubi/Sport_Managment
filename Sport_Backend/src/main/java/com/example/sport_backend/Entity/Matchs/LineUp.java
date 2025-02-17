package com.example.sport_backend.Entity.Matchs;

import com.example.sport_backend.Entity.ClubHouse.Player;
import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import jakarta.validation.constraints.Size;
import lombok.*;
import lombok.experimental.FieldDefaults;
import org.hibernate.annotations.Cascade;

import java.util.List;

@Getter
@Setter
@ToString
@AllArgsConstructor
@NoArgsConstructor
@FieldDefaults(level= AccessLevel.PRIVATE)
@Entity
public class LineUp {
    @Id
    @GeneratedValue(strategy= GenerationType.IDENTITY)
    Long id;
    String formation;
    @ElementCollection
    @Size(max = 11)
    @Cascade(org.hibernate.annotations.CascadeType.ALL) // Apply cascading here too if needed
    private List<Long> TeamplayerNumbers;
    @ElementCollection
    @Size(max = 7)
    @Cascade(org.hibernate.annotations.CascadeType.ALL) // Use Hibernate's Cascade if needed (for complex cases)

    private List<Long> TeamplayerSubsNumbers;
   private Boolean isHomeTeam;
    @OneToOne
    @JsonIgnore
    Match match;


}
