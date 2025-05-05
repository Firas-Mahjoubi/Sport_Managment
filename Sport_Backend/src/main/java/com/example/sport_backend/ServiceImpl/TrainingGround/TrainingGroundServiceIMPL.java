package com.example.sport_backend.ServiceImpl.TrainingGround;

import com.example.sport_backend.Entity.ClubHouse.Player;
import com.example.sport_backend.Entity.TrainigGround.Exercice;
import com.example.sport_backend.Entity.TrainigGround.MediaExercice;
import com.example.sport_backend.Entity.TrainigGround.Tag;
import com.example.sport_backend.Entity.TrainigGround.TrainingSession;
import com.example.sport_backend.Repositories.ClubHouse.PlayerRepo;
import com.example.sport_backend.Repositories.TrainingGround.ExerciceRepositories;
import com.example.sport_backend.Repositories.TrainingGround.MediaRepositories;
import com.example.sport_backend.Repositories.TrainingGround.TagRepositories;
import com.example.sport_backend.Repositories.TrainingGround.TrainingSessionRepositories;
import com.example.sport_backend.ServiceInterface.TrainingGround.ItrainingGroundService;
import jakarta.transaction.Transactional;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.*;

@Service
@AllArgsConstructor
@Slf4j
public class TrainingGroundServiceIMPL implements ItrainingGroundService {
    private ExerciceRepositories exerciceRepositories;
    private TrainingSessionRepositories trainingSessionRepositories;
    private TagRepositories tagRepositories;
    private MediaRepositories mediaRepositories;
    private PlayerRepo playerRepositories;

    ///////////--------------------------TrainingSession----------------------------////////////////



    @Override
    public TrainingSession addSession(TrainingSession trainingSession) {
        return trainingSessionRepositories.save(trainingSession);
    }

    @Override
    public List<TrainingSession> getAllSessions() {
        return trainingSessionRepositories.findAll();
    }

    @Override
    public TrainingSession getSessionById(Long id) {
        return trainingSessionRepositories.findById(id).orElse(null);
    }

    @Override
    public void deleteTrainingSession(Long id) {
        trainingSessionRepositories.deleteById(id);
    }

    @Override
    public TrainingSession addPlayersToSession(Long sessionId, Set<Long> playerIds) {
        TrainingSession session = trainingSessionRepositories.findById(sessionId)
                .orElseThrow(() -> new RuntimeException("Session non trouvée"));

        Set<Player> players = new HashSet<>(playerRepositories.findAllById(playerIds));
        session.getPlayers().addAll(players);

        return trainingSessionRepositories.save(session);
    }




    ///////////--------------------------Exercice----------------------------////////////////

    @Override
    public Exercice createExercice(Exercice exercice) {
        return exerciceRepositories.save(exercice);
    }

    @Override
    public List<Exercice> getAllExercises() {
        return exerciceRepositories.findAll();
    }

    @Override
    public Exercice getExerciseById(Long id) {
        return exerciceRepositories.findById(id).orElseThrow(() -> new RuntimeException("Exercice non trouvé"));
    }

    @Override
    @Transactional
    public void deleteExercise(Long id) {
        exerciceRepositories.deleteById(id);
    }

    // ✅  Ajouter des exercices à une session existante
    public TrainingSession addExercisesToSession(Long sessionId, Set<Long> exerciceIds) {
        TrainingSession session = trainingSessionRepositories.findById(sessionId)
                .orElseThrow(() -> new RuntimeException("Session non trouvée"));

        Set<Exercice> exercices = Set.copyOf(exerciceRepositories.findAllById(exerciceIds));
        session.getExercices().addAll(exercices);

        return trainingSessionRepositories.save(session);
    }

    // ✅ Ajouter des Tags à un Exercice existant
    public Exercice addTagsToExercice(Long exerciceId, Set<Long> tagIds) {
        Exercice exercice = exerciceRepositories.findById(exerciceId)
                .orElseThrow(() -> new RuntimeException("Exercice non trouvé"));

        Set<Tag> tags = Set.copyOf(tagRepositories.findAllById(tagIds));
        exercice.getTags().addAll(tags);

        return exerciceRepositories.save(exercice);
    }
    // ✅ Get exercises filtered by tag name
    public List<Exercice> getExercisesByTag(String tagName) {
        return exerciceRepositories.findByTags_Name(tagName);
    }

    ///////////--------------------------Tag----------------------------////////////////

    @Override
    public Tag createTag(Tag tag) {
        return tagRepositories.save(tag);
    }

    @Override
    public List<Tag> getAllTags() {
        return tagRepositories.findAll();
    }

    // ✅ Remove a tag from an exercise
    @Transactional
    public Exercice removeTagFromExercice(Long exerciceId, Long tagId) {
        Exercice exercice = exerciceRepositories.findById(exerciceId)
                .orElseThrow(() -> new RuntimeException("Exercice not found"));

        Tag tag = tagRepositories.findById(tagId)
                .orElseThrow(() -> new RuntimeException("Tag not found"));

        exercice.getTags().remove(tag);
        return exerciceRepositories.save(exercice);
    }

    ///////////--------------------------MediaExerice----------------------------////////////////

    public MediaExercice saveMedia(MediaExercice mediaExercice) {
        return mediaRepositories.save(mediaExercice);
    }

    public List<MediaExercice> getMediaByExercice(Long exerciceId) {
        return mediaRepositories.findByExerciceId(exerciceId);
    }

    public void deleteMedia(Long id) {
        mediaRepositories.deleteById(id);
    }

    @Override
    public Exercice findById(Long id) {
        return exerciceRepositories.findById(id)
                .orElseThrow(() -> new RuntimeException("Exercice not found"));
    }

    public Map<String, Object> getDashboardStats() {
        Map<String, Object> stats = new HashMap<>();

        stats.put("totalExercises", exerciceRepositories.count());
        stats.put("totalSessions", trainingSessionRepositories.count());
        stats.put("averageAttendingPlayers", trainingSessionRepositories.getAverageAttendingPlayers());
        stats.put("topUsedExercises", exerciceRepositories.getTopUsedExercises(PageRequest.of(0, 5)));
        stats.put("upcomingSessions", trainingSessionRepositories.findUpcomingSessions(PageRequest.of(0, 3)));

        return stats;
    }

}
