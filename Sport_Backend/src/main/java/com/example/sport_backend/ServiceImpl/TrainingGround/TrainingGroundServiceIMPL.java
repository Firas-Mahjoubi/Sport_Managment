package com.example.sport_backend.ServiceImpl.TrainingGround;

import com.example.sport_backend.Entity.TrainigGround.Exercice;
import com.example.sport_backend.Entity.TrainigGround.TrainingSession;
import com.example.sport_backend.Repositories.TrainingGround.ExerciceRepositories;
import com.example.sport_backend.Repositories.TrainingGround.TrainingSessionRepositories;
import com.example.sport_backend.ServiceInterface.TrainingGround.ItrainingGroundService;
import jakarta.transaction.Transactional;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@AllArgsConstructor
@Slf4j
public class TrainingGroundServiceIMPL implements ItrainingGroundService {
    private ExerciceRepositories exerciceRepositories;
    private TrainingSessionRepositories trainingSessionRepositories;


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

    ///////////--------------------------Exercice----------------------------////////////////
    @Override
    public Exercice addExercice(Exercice exercice) {
        return exerciceRepositories.save(exercice);
    }

    @Override
    public List<Exercice> getAllExercises() {
        return exerciceRepositories.findAll();
    }

    @Override
    public Exercice getExerciseById(Long id) {
        return exerciceRepositories.findById(id).orElse(null);
    }



    @Override
    @Transactional
    public void deleteExercise(Long id) {
        exerciceRepositories.deleteById(id);
    }
}
