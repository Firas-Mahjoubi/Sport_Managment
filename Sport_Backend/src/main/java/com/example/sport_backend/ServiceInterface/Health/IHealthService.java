package com.example.sport_backend.ServiceInterface.Health;

import com.example.sport_backend.Entity.Health.HealthRecord;

import java.util.List;

public interface IHealthService {


    List<HealthRecord> getAllHealthRecords();
    HealthRecord getHealthRecordById(Long id);
    HealthRecord createHealthRecord(HealthRecord healthRecord);
    HealthRecord updateHealthRecord(Long id, HealthRecord healthRecord);
    void deleteHealthRecord(Long id);



}
