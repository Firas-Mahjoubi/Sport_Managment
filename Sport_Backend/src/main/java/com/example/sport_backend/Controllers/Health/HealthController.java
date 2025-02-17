package com.example.sport_backend.Controllers.Health;

import com.example.sport_backend.Entity.Health.HealthRecord;
import com.example.sport_backend.ServiceInterface.Health.IHealthService;

import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;



@RestController
@AllArgsConstructor
//@CrossOrigin(origins = "http://localhost:4200") // Autoriser Angular
@RequestMapping("/api/health")
public class HealthController {


    @Autowired
    private IHealthService healthService;


    @GetMapping("getAllHealthRecords")
    public List<HealthRecord> getAllHealthRecords() {
        return healthService.getAllHealthRecords();
    }


    @GetMapping("getHealthRecordById/{id}")
    public HealthRecord getHealthRecordById(@PathVariable Long id) {
        return healthService.getHealthRecordById(id);
    }



    @PostMapping("createHealthRecord")
    public HealthRecord createHealthRecord(@RequestBody HealthRecord healthRecord) {
        return healthService.createHealthRecord(healthRecord);
    }

    @PutMapping("updateHealthRecord(/{id}")
    public HealthRecord updateHealthRecord(@PathVariable Long id, @RequestBody HealthRecord healthRecord) {
        return healthService.updateHealthRecord(id, healthRecord);
    }



    @DeleteMapping("deleteHealthRecord/{id}")
    public void deleteHealthRecord(@PathVariable Long id) {
        healthService.deleteHealthRecord(id);
    }
}
