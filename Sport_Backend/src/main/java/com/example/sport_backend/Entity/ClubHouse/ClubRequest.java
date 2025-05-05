package com.example.sport_backend.Entity.ClubHouse;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;
import org.springframework.web.multipart.MultipartFile;

import java.time.LocalDate;

@Getter
@Setter
@AllArgsConstructor
public class ClubRequest {

    Long id;
    String name;
    String location;
    String stadiumName;
    LocalDate foundationYear;
    Long leagueId;
    MultipartFile imageUrl1;
}
