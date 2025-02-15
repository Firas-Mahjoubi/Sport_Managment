package com.example.sport_backend.Entity.ClubHouse;

import com.example.sport_backend.Entity.Enum.Categories;
import com.example.sport_backend.Entity.Tactic.Tactic;
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
    @Enumerated(EnumType.STRING)
    Categories categories;
    @OneToMany(mappedBy = "team")
    List<User>users;
    @ManyToOne
    Club club;
    @OneToMany(mappedBy = "team")
    List<Player>players;
    @OneToMany(mappedBy = "team", cascade = CascadeType.PERSIST)
    List<Tactic> tactics;
    public void setTactic(Tactic tactic) {
        this.tactics = (List<Tactic>) tactic;
    }

}
