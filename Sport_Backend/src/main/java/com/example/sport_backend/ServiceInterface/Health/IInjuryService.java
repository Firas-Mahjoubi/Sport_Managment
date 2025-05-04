package com.example.sport_backend.ServiceInterface.Health;

import com.example.sport_backend.Entity.Health.Injury;
import com.example.sport_backend.Entity.Health.InjuryHistory;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface IInjuryService {


    List<Injury> getAllInjuries();

    Injury getInjuryById(Long id);


   // Injury createInjury(Injury injury);
    Injury createInjury(Long playerId, Injury injury);

    //Injury updateInjury(Long id, Injury injury);
     public Injury updateInjury(Long id, Injury newInjury);
    //public Injury updateInjury(Long playerId, Long injuryId, Injury newInjury);

    List<Injury> getInjuriesByPlayer(Long playerId);


    void archiveAndRemoveInjury(Long injuryId);

    List<InjuryHistory> getInjuryHistoryByPlayer(Long playerId);


    List<InjuryHistory> getAllArchivedInjuries();



}


