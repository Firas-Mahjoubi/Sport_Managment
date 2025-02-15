package com.example.sport_backend.Entity.Matches;

import com.example.sport_backend.Entity.ClubHouse.Team;
import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.FieldDefaults;

import java.sql.Time;
import java.time.LocalDate;
import java.util.List;
import java.util.regex.Pattern;

@Getter
@Setter
@ToString
@AllArgsConstructor
@NoArgsConstructor
@FieldDefaults(level= AccessLevel.PRIVATE)
@Entity
@Table(name = "game_match")
public class Match {
    @Id
    @GeneratedValue(strategy= GenerationType.IDENTITY)
    Long id;
    String homeTeam;
    String awayTeam;
    LocalDate date;
    Time startTime;
    String stadium;
    String result;

    @Column(nullable = false)
    String season;

    @Column(nullable = false)
    Integer gameWeek;  // New field for storing the game week

    @ManyToMany
    List<Team> teams;

    @OneToMany(cascade = CascadeType.ALL, mappedBy = "match")
    List<Goal> goals;

    @OneToMany(cascade = CascadeType.ALL, mappedBy = "match")
    List<Card> cards;

    @OneToMany(cascade = CascadeType.ALL, mappedBy = "match")
    List<Substitution> substitutions;

    @OneToOne(cascade = CascadeType.ALL, mappedBy = "match")
    LineUp lineUp;

    private static final Pattern RESULT_PATTERN = Pattern.compile("^\\d+-\\d+$");

    public void setResult(String result) {
        if (result == null || RESULT_PATTERN.matcher(result).matches()) {
            this.result = result;
        } else {
            throw new IllegalArgumentException("Invalid result format. Expected format: 'integer-integer' (e.g., 2-1)");
        }
    }

    @PrePersist
    @PreUpdate
    public void setSeasonAutomatically() {
        if (date != null) {
            int year = date.getYear();
            int month = date.getMonthValue();
            if (month >= 1 && month <= 8) {
                season = (year - 1) + "/" + year;
            } else {
                season = year + "/" + (year + 1);
            }
        }
    }
}