package com.example.sport_backend.Entity.ClubHouse;

import com.example.sport_backend.Entity.Enum.Role;
import com.example.sport_backend.Entity.TrainigGround.TrainingSession;
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
public class User {
    @Id
    @GeneratedValue(strategy= GenerationType.IDENTITY)
    Long id;
    String name;
    String email;
    String password;
    String phoneNumber;
    @Enumerated(EnumType.STRING)
    Role role;
    @ManyToOne
    Team team;
    @OneToMany(mappedBy = "user")
    List<TrainingSession>trainingSessions;



}
