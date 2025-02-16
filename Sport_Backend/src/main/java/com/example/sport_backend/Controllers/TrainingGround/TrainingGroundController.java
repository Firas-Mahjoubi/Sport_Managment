package com.example.sport_backend.Controllers.TrainingGround;



import com.example.sport_backend.Entity.TrainigGround.Exercice;
import com.example.sport_backend.Entity.TrainigGround.TrainingSession;
import com.example.sport_backend.ServiceInterface.TrainingGround.ItrainingGroundService;
import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@AllArgsConstructor
@RequestMapping("/api/TrainingGround")
@CrossOrigin(origins = "*") // Allow CORS for frontend access

public class TrainingGroundController {
    private final ItrainingGroundService itrainingGroundService;

    ///////////--------------------------TrainingSession----------------------------////////////////
    @PostMapping("AddTrainingSession")
    public TrainingSession addSession(@RequestBody TrainingSession trainingSession) {
        return itrainingGroundService.addSession(trainingSession);
    }
    @GetMapping("/getTrainingSession")
    public List<TrainingSession> getAllSessions() {
        return itrainingGroundService.getAllSessions();
    }
    @DeleteMapping("/deleteTrainingSession/{id}")
    public void deleteTrainingSession(@PathVariable Long id) {
        itrainingGroundService.deleteTrainingSession(id);
    }

    ///////////--------------------------Exercice----------------------------////////////////
    @PostMapping("AddExercice")
    public Exercice addExercice(@RequestBody Exercice exercice) {
        return itrainingGroundService.addExercice(exercice);
    }

    @DeleteMapping("/deleteExercice/{id}")
    public void deleteExercise(@PathVariable Long id) {
        itrainingGroundService.deleteExercise(id);
    }

@GetMapping("/getExercices")
    public List<Exercice> getAllExercises() {
        return itrainingGroundService.getAllExercises();
    }


}
