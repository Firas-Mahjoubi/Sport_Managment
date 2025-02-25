package com.example.sport_backend.Controllers.Health;

import com.example.sport_backend.Entity.Health.HealthRecord;
import com.example.sport_backend.Entity.ClubHouse.Player;
import com.example.sport_backend.ServiceInterface.Health.IHealthService;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@AllArgsConstructor
@CrossOrigin(origins = "*") // Allow CORS for frontend access
@RequestMapping("/api/health")
public class HealthController {

    @Autowired
    private IHealthService healthService;

    // Récupérer tous les enregistrements de santé
    @GetMapping("getAllHealthRecords")
    public List<HealthRecord> getAllHealthRecords() {
        return healthService.getAllHealthRecords();
    }

    // Récupérer un enregistrement de santé par ID
    @GetMapping("getHealthRecordById/{id}")
    public HealthRecord getHealthRecordById(@PathVariable Long id) {
        return healthService.getHealthRecordById(id);
    }

    @PostMapping("createHealthRecord/{playerId}")
    public HealthRecord createHealthRecord(@RequestBody HealthRecord healthRecord, @PathVariable Long playerId) {
        return healthService.createHealthRecord(healthRecord, playerId);
    }


    // Mettre à jour un enregistrement de santé existant
    @PutMapping("updateHealthRecord/{id}")
    public HealthRecord updateHealthRecord(@PathVariable Long id, @RequestBody HealthRecord healthRecord) {
        return healthService.updateHealthRecord(id, healthRecord);
    }

    // Supprimer un enregistrement de santé par ID
    @DeleteMapping("deleteHealthRecord/{id}")
    public void deleteHealthRecord(@PathVariable Long id) {
        healthService.deleteHealthRecord(id);
    }



}
