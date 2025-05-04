package com.example.sport_backend.Entity.ClubHouse;

import com.example.sport_backend.Entity.Enum.Categories;
import lombok.Getter;
import lombok.Setter;


@Getter
@Setter
public class TeamRequest {

    private String name;
    private Categories categories;
    private Long clubId;
}
