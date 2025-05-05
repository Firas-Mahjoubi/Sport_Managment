package com.example.sport_backend.Entity.ClubHouse;

import jakarta.persistence.Column;
import jakarta.persistence.Lob;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;
import org.springframework.web.multipart.MultipartFile;

import java.time.LocalDate;

@Getter
@Setter
@AllArgsConstructor


public class PlayerRequest {
    String FirstName;
    String LastName;
    String position;
    Integer playerNumber;
    String performanceStats;
    LocalDate birthDate;
    String clubName;
    String category;
    Long clubId;


    MultipartFile imageUrl;
}
