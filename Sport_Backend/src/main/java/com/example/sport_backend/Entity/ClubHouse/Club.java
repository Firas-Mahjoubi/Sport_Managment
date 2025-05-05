package com.example.sport_backend.Entity.ClubHouse;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.FieldDefaults;

import java.time.LocalDate;
import java.util.List;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@FieldDefaults(level= AccessLevel.PRIVATE)
@Entity
@Builder
public class Club {
    @Id
    @GeneratedValue(strategy= GenerationType.IDENTITY)
    Long id;
    String name;
    String location;
    String stadiumName;
    LocalDate foundationYear;
    String leagues;



    @Lob
    byte[] imageUrl;
    @OneToMany(mappedBy = "club", fetch = FetchType.LAZY)
    @JsonIgnore

    List<Team>teams;
    @ManyToOne
    League league;


    @OneToMany(mappedBy = "club")
    @JsonIgnore
    private List<Player> players;




}
