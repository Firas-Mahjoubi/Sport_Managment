package com.example.sport_backend.ServiceInterface.TrainingGround;

import com.example.sport_backend.Entity.TrainigGround.Exercice;
import com.example.sport_backend.Entity.TrainigGround.MediaExercice;
import com.example.sport_backend.Entity.TrainigGround.Tag;
import com.example.sport_backend.Entity.TrainigGround.TrainingSession;

import java.util.List;
import java.util.Map;
import java.util.Set;

public interface ItrainingGroundService {

    ///////////--------------------------TrainingSession----------------------------////////////////
    TrainingSession addSession(TrainingSession trainingSession);
    List<TrainingSession> getAllSessions();
    TrainingSession getSessionById(Long id);
    void deleteTrainingSession(Long id);
    TrainingSession addPlayersToSession(Long sessionId, Set<Long> playerIds);


    ///////////--------------------------Exercice----------------------------////////////////
    public Exercice createExercice(Exercice exercice);
    List<Exercice> getAllExercises();
    Exercice getExerciseById(Long id);
    void deleteExercise(Long id);
    public TrainingSession addExercisesToSession(Long sessionId, Set<Long> exerciceIds);
    public Exercice addTagsToExercice(Long exerciceId, Set<Long> tagIds);

    public List<Exercice> getExercisesByTag(String tagName);
    ///////////--------------------------Tag----------------------------////////////////
    public Tag createTag(Tag tag);
    public List<Tag> getAllTags() ;

    public Exercice removeTagFromExercice(Long exerciceId, Long tagId);

    ///////////--------------------------MediaExercice----------------------------////////////////

    public MediaExercice saveMedia(MediaExercice mediaExercice);

    public List<MediaExercice> getMediaByExercice(Long exerciceId);

    public void deleteMedia(Long id);
    Exercice findById(Long id);
    public Map<String, Object> getDashboardStats();

}
