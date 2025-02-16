package com.example.sport_backend.ServiceInterface.TrainingGround;

import com.example.sport_backend.Entity.TrainigGround.Exercice;
import com.example.sport_backend.Entity.TrainigGround.TrainingSession;

import java.util.List;

public interface ItrainingGroundService {

    ///////////--------------------------TrainingSession----------------------------////////////////
    TrainingSession addSession(TrainingSession trainingSession);
    List<TrainingSession> getAllSessions();
    TrainingSession getSessionById(Long id);
    void deleteTrainingSession(Long id);


    ///////////--------------------------Exercice----------------------------////////////////
    Exercice addExercice(Exercice exercice);
    List<Exercice> getAllExercises();
    Exercice getExerciseById(Long id);
    void deleteExercise(Long id);

}
