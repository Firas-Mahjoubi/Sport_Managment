package com.example.sport_backend.Entity.ClubHouse;

import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.FieldDefaults;

import java.time.LocalDate;
import java.util.List;

@Getter
@Setter
@ToString
@AllArgsConstructor
@NoArgsConstructor
@FieldDefaults(level= AccessLevel.PRIVATE)
@Entity
public class Club {
    @Id
    @GeneratedValue(strategy= GenerationType.IDENTITY)
    Long id;
    String name;
    String location;
    LocalDate foundationYear;
    String clubLogo;
    @OneToMany(mappedBy = "club")
    List<Team>teams;
}
