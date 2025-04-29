package com.example.sport_backend.DTO;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class MediaLinkDTO {
    public Long exerciseId;
    public String firebaseUrl;
    public String type;
}
