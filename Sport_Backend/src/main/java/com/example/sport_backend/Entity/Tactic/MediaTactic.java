package com.example.sport_backend.Entity.Tactic;

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
public class MediaTactic {
    @Id
    @GeneratedValue(strategy= GenerationType.IDENTITY)
    Long id;
    String type;
    String filePath;
    @ManyToOne
    Tactic tactic;
}
