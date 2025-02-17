package com.example.sport_backend.ServiceInterface.Health;

import com.example.sport_backend.Entity.Health.Injury;

import java.util.List;

public interface IInjuryService {


    List<Injury> getAllInjuries();
    Injury getInjuryById(Long id);
    Injury createInjury(Injury injury);
    Injury updateInjury(Long id, Injury injury);
    void deleteInjury(Long id);
}
