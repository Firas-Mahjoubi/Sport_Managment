package com.example.sport_backend.Entity.ClubHouse;

import com.example.sport_backend.Entity.Health.HealthRecord;
import com.example.sport_backend.Entity.Health.Injury;
import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.FieldDefaults;

import java.util.Set;

@Getter
@Setter
@ToString
@AllArgsConstructor
@NoArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
@Entity
public class Player {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    Long id;
    String FirstName;
    String LastName;
    String position;
    Integer playerNumber;
    String performanceStats;
    @ManyToOne
    Team team;


    @OneToMany(cascade = CascadeType.ALL, mappedBy = "player")
    private Set<Injury> injuries;

    @OneToOne
    @JoinColumn(name = "health_record_id")
    private HealthRecord healthRecord;

}
