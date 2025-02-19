package com.example.sport_backend.Controllers.TrainingGround;



import com.example.sport_backend.Entity.TrainigGround.Exercice;
import com.example.sport_backend.Entity.TrainigGround.MediaExercice;
import com.example.sport_backend.Entity.TrainigGround.Tag;
import com.example.sport_backend.Entity.TrainigGround.TrainingSession;
import com.example.sport_backend.ServiceInterface.TrainingGround.ItrainingGroundService;
import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Set;

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
    public Exercice createExercice(@RequestBody Exercice exercice) {
        return itrainingGroundService.createExercice(exercice);
    }

    @DeleteMapping("/deleteExercice/{id}")
    public void deleteExercise(@PathVariable Long id) {
        itrainingGroundService.deleteExercise(id);
    }

    @GetMapping("/getExercices")
    public List<Exercice> getAllExercises() {
        return itrainingGroundService.getAllExercises();
    }


    // ✅ 2. Ajouter des exercices à une session existante
    @PostMapping("/{sessionId}/add-exercises")
    public TrainingSession addExercisesToSession(@PathVariable Long sessionId, @RequestBody Set<Long> exerciceIds) {
        return itrainingGroundService.addExercisesToSession(sessionId, exerciceIds);
    }

    @PostMapping("/{exerciceId}/add-tags")
    public Exercice addTagsToExercice(@PathVariable Long exerciceId, @RequestBody Set<Long> tagIds) {
        return itrainingGroundService.addTagsToExercice(exerciceId, tagIds);
    }

    @GetMapping("/getExerciceByTag")
    public List<Exercice> getExercises(@RequestParam String tag) {
        if (tag != null) {
            return itrainingGroundService.getExercisesByTag(tag);
        }
        return itrainingGroundService.getAllExercises();
    }

    ///////////--------------------------Tag----------------------------////////////////
    @PostMapping("AddTag")
    public Tag createTag(@RequestBody Tag tag) {
        return itrainingGroundService.createTag(tag);
    }
    @GetMapping("/getTags")
    public List<Tag> getAllTags() {
        return itrainingGroundService.getAllTags();
    }

    @DeleteMapping("/{exerciseId}/remove-tag/{tagId}")
    public Exercice removeTag(@PathVariable Long exerciseId, @PathVariable Long tagId) {
        return itrainingGroundService.removeTagFromExercice(exerciseId, tagId);
    }
    ///////////--------------------------MediaExercice----------------------------////////////////

    // ✅ Ajouter un média à un exercice
    @PostMapping("/AddMediaToExercice/")
    public MediaExercice addMedia(@RequestBody MediaExercice mediaExercice) {
        return itrainingGroundService.saveMedia(mediaExercice);
    }

    // ✅ Récupérer les médias d'un exercice
    @GetMapping("/exercise/{exerciseId}")
    public List<MediaExercice> getMediaByExercise(@PathVariable Long exerciseId) {
        return itrainingGroundService.getMediaByExercice(exerciseId);
    }

    // ✅ Supprimer un média
    @DeleteMapping("/{id}")
    public void deleteMedia(@PathVariable Long id) {
        itrainingGroundService.deleteMedia(id);
    }


}
