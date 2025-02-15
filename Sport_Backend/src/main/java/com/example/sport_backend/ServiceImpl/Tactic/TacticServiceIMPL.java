package com.example.sport_backend.ServiceImpl.Tactic;




import com.example.sport_backend.Entity.ClubHouse.Team;
import com.example.sport_backend.Entity.Tactic.Tactic;
import com.example.sport_backend.Repositories.ClubHouse.TeamRepositories;
import com.example.sport_backend.Repositories.Tactic.TacticRepositories;
import com.example.sport_backend.ServiceInterface.Tactic.ITacticService;
import jakarta.persistence.EntityNotFoundException;
import jakarta.transaction.Transactional;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@AllArgsConstructor
@Slf4j
public class TacticServiceIMPL implements ITacticService {
    private TacticRepositories tacticRepositories;
    private TeamRepositories teamRepositories;
    @Override
    public Tactic createTactic(Tactic tactic) {
        return tacticRepositories.save(tactic);
    }

    @Override
    public Tactic updateTactic(Long id, Tactic updatedTactic) {
        return tacticRepositories.findById(id).map(existingTactic -> {
            existingTactic.setName(updatedTactic.getName());
            existingTactic.setDescription(updatedTactic.getDescription());
            existingTactic.setFormation(updatedTactic.getFormation());
            existingTactic.setTrainingFocus(updatedTactic.getTrainingFocus());
            return tacticRepositories.save(existingTactic);
        }).orElseThrow(()-> new RuntimeException("No such tactic"));

    }

    @Override
    @Transactional
    public void deleteTactic(Long id) {

            tacticRepositories.deleteById(id);

    }







    @Override
    public List<Tactic> getAllTactics() {
        return tacticRepositories.findAll();
    }

    @Override
    public List<Tactic> getTacticsByTeam(Long teamId) {
        return tacticRepositories.findByTeamId(teamId);
    }

}
