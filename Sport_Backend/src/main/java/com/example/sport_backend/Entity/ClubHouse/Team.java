package com.example.sport_backend.Entity.ClubHouse;

import com.example.sport_backend.Entity.Enum.Categories;
import com.example.sport_backend.Entity.Matches.Match;
import com.example.sport_backend.Entity.Tactic.Tactic;
import com.fasterxml.jackson.annotation.JsonIgnore;
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
public class Team {
    @Id
    @GeneratedValue(strategy= GenerationType.IDENTITY)
    Long id;
    String name;
    String Stadium;
    @Enumerated(EnumType.STRING)
    Categories categories;
   @ManyToMany(cascade = CascadeType.ALL,mappedBy = "teams")
   List<Match> matches;
    @OneToMany(mappedBy = "team")
    List<User>users;
    @ManyToOne
    Club club;
    @OneToMany(mappedBy = "team")
            @JsonIgnore
    List<Player>players;
    @OneToMany(mappedBy = "team", cascade = CascadeType.PERSIST)
    List<Tactic> tactics;

}
