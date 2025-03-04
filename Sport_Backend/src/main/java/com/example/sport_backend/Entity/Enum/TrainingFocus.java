package com.example.sport_backend.Entity.Enum;

public enum TrainingFocus {
    ATTACK, DEFENSE, POSSESSION, PRESSING;

    public static TrainingFocus fromString(String value) {
        try {
            return TrainingFocus.valueOf(value.toUpperCase());
        } catch (Exception e) {
            throw new IllegalArgumentException("Invalid TrainingFocus value: " + value);
        }
    }
}
