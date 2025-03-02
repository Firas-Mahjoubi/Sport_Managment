    package com.example.sport_backend.Entity.ClubHouse;

    import com.example.sport_backend.Entity.Enum.Categories;
    import com.example.sport_backend.Entity.Matchs.Match;
    import com.example.sport_backend.Entity.Tactic.Tactic;
    import com.example.sport_backend.Entity.TrainigGround.TrainingSession;
    import com.fasterxml.jackson.annotation.JsonBackReference;
    import com.fasterxml.jackson.annotation.JsonIgnore;
    import jakarta.persistence.*;
    import lombok.*;
    import lombok.experimental.FieldDefaults;

    import java.util.List;

    @Getter
    @Setter
    @AllArgsConstructor
    @NoArgsConstructor
    @FieldDefaults(level = AccessLevel.PRIVATE)
    @Entity
    public class Team {
        @Id
        @GeneratedValue(strategy = GenerationType.IDENTITY)
        Long id;

        String name;
        String Stadium;
        String logoUrl;


        @Enumerated(EnumType.STRING)
        Categories categories;

        @ManyToMany(mappedBy = "teams") // ❌ Removed CascadeType.ALL (Avoids unwanted deletions)
        @JsonIgnore // ✅ Prevents infinite recursion
        List<Match> matches;

        @OneToMany(mappedBy = "team", cascade = CascadeType.ALL, orphanRemoval = true)
        @JsonIgnore
        List<User> users;

        @ManyToOne(fetch = FetchType.LAZY)
                @JsonIgnore
        Club club;

        @JsonIgnore
        @OneToMany(mappedBy = "team", cascade = CascadeType.ALL, orphanRemoval = true)
        List<Player> players;

        @OneToMany(mappedBy = "team", cascade = CascadeType.ALL, orphanRemoval = true)
        @JsonIgnore
        List<Tactic> tactics;

        @OneToOne
        TrainingSession trainingSession;
    }
