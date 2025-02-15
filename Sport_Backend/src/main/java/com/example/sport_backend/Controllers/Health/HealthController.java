package com.example.sport_backend.Controllers.Health;

import com.example.sport_backend.Entity.Health.HealthRecord;
import com.example.sport_backend.ServiceInterface.Health.IHealthService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

public class HealthController {



    private IHealthService healthService;


    @GetMapping
    public List<HealthRecord> getAllHealthRecords() {
        return healthService.getAllHealthRecords();
    }

    @GetMapping("/{id}")
    public HealthRecord getHealthRecordById(@PathVariable Long id) {
        return healthService.getHealthRecordById(id);
    }



    @PostMapping
    public HealthRecord createHealthRecord(@RequestBody HealthRecord healthRecord) {
        return healthService.createHealthRecord(healthRecord);
    }

    @PutMapping("/{id}")
    public HealthRecord updateHealthRecord(@PathVariable Long id, @RequestBody HealthRecord healthRecord) {
        return healthService.updateHealthRecord(id, healthRecord);
    }



    @DeleteMapping("/{id}")
    public void deleteHealthRecord(@PathVariable Long id) {
        healthService.deleteHealthRecord(id);
    }
}
